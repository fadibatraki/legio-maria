"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Moon, Sun, BookOpen, List, Volume2, Square, Pause, Play } from "lucide-react";
import type { Chapter } from "@/data/chapters";

const THEME_KEY = "legio-reading-theme";
const FOCUS_KEY = "legio-reading-focus";
const PROGRESS_KEY = "legio-reading-progress";
const PENDING_RESUME_KEY = "legio-reading-pending-resume";
const BOOKMARKS_KEY = "legio-reading-bookmarks";
const BOOKMARKS_EVENT = "legio-reading-bookmarks-change";
const BOOKMARK_FOCUS_EVENT = "legio-reading-bookmark-focus";
const PENDING_BOOKMARK_KEY = "legio-reading-pending-bookmark";
const BOOKMARK_DUPLICATE_THRESHOLD = 48;

type ReadingControlsProps = {
  chapters: Chapter[];
};

type ReadingProgress = {
  href: string;
  slug: string;
  scrollY: number;
  lastReadAt: number;
};

type ReadingBookmark = {
  id: string;
  href: string;
  slug: string;
  number: string;
  title: string;
  selectedText?: string;
  scrollY: number;
  addedAt: number;
};

type SelectionPopup = {
  text: string;
  scrollY: number;
  top: number;
  left: number;
};

const readStoredProgress = () => {
  try {
    const storedProgress = window.localStorage.getItem(PROGRESS_KEY);

    if (!storedProgress) {
      return null;
    }

    return JSON.parse(storedProgress) as ReadingProgress;
  } catch {
    return null;
  }
};

const readStoredBookmarks = () => {
  try {
    const storedBookmarks = window.localStorage.getItem(BOOKMARKS_KEY);

    if (!storedBookmarks) {
      return [];
    }

    const bookmarks = JSON.parse(storedBookmarks) as ReadingBookmark[];
    return Array.isArray(bookmarks) ? bookmarks : [];
  } catch {
    return [];
  }
};

const focusBookmarkInSidebar = (bookmarkId: string) => {
  window.setTimeout(() => {
    window.dispatchEvent(
      new CustomEvent(BOOKMARK_FOCUS_EVENT, {
        detail: {
          bookmarkId,
        },
      }),
    );
  }, 0);
};

const getSelectedChapterRange = () => {
  const selection = window.getSelection();

  if (!selection || selection.isCollapsed || selection.rangeCount === 0) {
    return null;
  }

  const range = selection.getRangeAt(0);
  const article = document.querySelector(".chapter-article");

  if (
    !article ||
    !article.contains(range.commonAncestorContainer)
  ) {
    return null;
  }

  const text = selection.toString().replace(/\s+/g, " ").trim();

  if (!text) {
    return null;
  }

  return {
    range,
    text,
  };
};

export default function ReadingControls({ chapters }: ReadingControlsProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isChapterPage = pathname.startsWith("/chapters/");
  const isHomePage = pathname === "/";
  const isReadingPage = isChapterPage || isHomePage;
  const currentChapter = chapters.find((chapter) => chapter.href === pathname);
  const userScrolledRef = useRef(false);
  const [isDark, setIsDark] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [savedProgress, setSavedProgress] = useState<ReadingProgress | null>(null);
  const [selectionPopup, setSelectionPopup] = useState<SelectionPopup | null>(null);
  const [ttsState, setTtsState] = useState<'idle' | 'playing' | 'paused'>('idle');
  const utterancesRef = useRef<SpeechSynthesisUtterance[]>([]);
  const currentUtteranceIndexRef = useRef(0);
  const isSpeakingRef = useRef(false);
  const chunksRef = useRef<string[]>([]);

  useEffect(() => {
    setIsDark(window.localStorage.getItem(THEME_KEY) === "dark");
    setIsFocus(window.localStorage.getItem(FOCUS_KEY) === "true");
    setSavedProgress(readStoredProgress());
    setIsReady(true);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("reading-dark", isReadingPage && isDark);
    document.body.classList.toggle("reading-focus", isChapterPage && isFocus);

    return () => {
      document.body.classList.remove("reading-dark", "reading-focus");
    };
  }, [isReadingPage, isChapterPage, isDark, isFocus]);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    window.localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
  }, [isDark, isReady]);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    window.localStorage.setItem(FOCUS_KEY, isFocus ? "true" : "false");
  }, [isFocus, isReady]);

  useEffect(() => {
    if (!isReady || !isChapterPage) {
      return;
    }

    userScrolledRef.current = false;

    const pendingResume = window.sessionStorage.getItem(PENDING_RESUME_KEY);

    if (pendingResume) {
      try {
        const progress = JSON.parse(pendingResume) as ReadingProgress;

        if (progress.href === pathname) {
          window.sessionStorage.removeItem(PENDING_RESUME_KEY);
          window.setTimeout(() => {
            window.scrollTo({
              top: progress.scrollY,
              behavior: "smooth",
            });
          }, 120);
        }
      } catch {
        window.sessionStorage.removeItem(PENDING_RESUME_KEY);
      }
    }

    const pendingBookmark = window.sessionStorage.getItem(PENDING_BOOKMARK_KEY);

    if (pendingBookmark) {
      try {
        const bookmark = JSON.parse(pendingBookmark) as ReadingBookmark;

        if (bookmark.href === pathname) {
          window.sessionStorage.removeItem(PENDING_BOOKMARK_KEY);
          window.setTimeout(() => {
            window.scrollTo({
              top: bookmark.scrollY,
              behavior: "smooth",
            });
          }, 160);
        }
      } catch {
        window.sessionStorage.removeItem(PENDING_BOOKMARK_KEY);
      }
    }

    const markUserScroll = () => {
      userScrolledRef.current = true;
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(
          event.key,
        )
      ) {
        markUserScroll();
      }
    };

    let saveTimeout: number | undefined;
    const saveProgress = () => {
      if (!userScrolledRef.current) {
        return;
      }

      window.clearTimeout(saveTimeout);
      saveTimeout = window.setTimeout(() => {
        const progress = {
          href: pathname,
          slug: pathname.split("/").pop() ?? "",
          scrollY: Math.round(window.scrollY),
          lastReadAt: Date.now(),
        };

        window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
        setSavedProgress(progress);
      }, 220);
    };

    window.addEventListener("wheel", markUserScroll, { passive: true });
    window.addEventListener("touchmove", markUserScroll, { passive: true });
    window.addEventListener("pointerdown", markUserScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", saveProgress, { passive: true });

    return () => {
      window.clearTimeout(saveTimeout);
      window.removeEventListener("wheel", markUserScroll);
      window.removeEventListener("touchmove", markUserScroll);
      window.removeEventListener("pointerdown", markUserScroll);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", saveProgress);
    };
  }, [isChapterPage, isReady, pathname]);

  useEffect(() => {
    if (!isReady || !isChapterPage) {
      setSelectionPopup(null);
      return;
    }

    const updateSelectionPopup = () => {
      const selectedRange = getSelectedChapterRange();

      if (!selectedRange) {
        setSelectionPopup(null);
        return;
      }

      const rect = selectedRange.range.getBoundingClientRect();

      if (!rect.width && !rect.height) {
        setSelectionPopup(null);
        return;
      }

      const top =
        rect.top > 72 ? rect.top - 58 : Math.min(rect.bottom + 12, window.innerHeight - 64);

      setSelectionPopup({
        text: selectedRange.text,
        scrollY: Math.max(0, Math.round(window.scrollY + rect.top - 110)),
        top,
        left: Math.min(
          window.innerWidth - 18,
          Math.max(18, rect.left + rect.width / 2),
        ),
      });
    };

    const clearSelectionPopup = (event: Event) => {
      const target = event.target;

      if (target instanceof Element && target.closest(".selection-popup")) {
        return;
      }

      if (!window.getSelection()?.toString().trim()) {
        setSelectionPopup(null);
      }
    };

    document.addEventListener("mouseup", updateSelectionPopup);
    document.addEventListener("keyup", updateSelectionPopup);
    document.addEventListener("selectionchange", clearSelectionPopup);

    return () => {
      document.removeEventListener("mouseup", updateSelectionPopup);
      document.removeEventListener("keyup", updateSelectionPopup);
      document.removeEventListener("selectionchange", clearSelectionPopup);
    };
  }, [isChapterPage, isReady, pathname]);

  const canResume =
    savedProgress &&
    (savedProgress.href !== pathname || savedProgress.scrollY > 80);

  const resumeReading = () => {
    if (!savedProgress) {
      return;
    }

    if (savedProgress.href === pathname) {
      window.scrollTo({
        top: savedProgress.scrollY,
        behavior: "smooth",
      });
      return;
    }

    window.sessionStorage.setItem(PENDING_RESUME_KEY, JSON.stringify(savedProgress));
    router.push(savedProgress.href);
  };

  const addBookmark = (selectedText: string, scrollY: number) => {
    if (!currentChapter) {
      return;
    }

    const normalizedSelectedText = selectedText.replace(/\s+/g, " ").trim();
    const storedBookmarks = readStoredBookmarks();
    const duplicateBookmark = storedBookmarks.find(
      (bookmark) =>
        bookmark.href === currentChapter.href &&
        Math.abs(bookmark.scrollY - scrollY) <= BOOKMARK_DUPLICATE_THRESHOLD &&
        (bookmark.selectedText ?? "") === normalizedSelectedText,
    );

    if (duplicateBookmark) {
      setSelectionPopup(null);
      window.getSelection()?.removeAllRanges();
      focusBookmarkInSidebar(duplicateBookmark.id);
      return;
    }

    const bookmark = {
      id: `${currentChapter.href}-${Date.now()}-${scrollY}`,
      href: currentChapter.href,
      slug: currentChapter.href.split("/").pop() ?? "",
      number: currentChapter.number,
      title: currentChapter.title,
      selectedText: normalizedSelectedText,
      scrollY,
      addedAt: Date.now(),
    };

    window.localStorage.setItem(
      BOOKMARKS_KEY,
      JSON.stringify([bookmark, ...storedBookmarks]),
    );
    window.dispatchEvent(
      new CustomEvent(BOOKMARKS_EVENT, {
        detail: {
          bookmarkId: bookmark.id,
        },
      }),
    );
    focusBookmarkInSidebar(bookmark.id);
    setSelectionPopup(null);
    window.getSelection()?.removeAllRanges();
  };

  const copySelection = async () => {
    if (!selectionPopup) {
      return;
    }

    try {
      await window.navigator.clipboard.writeText(selectionPopup.text);
    } catch {
      return;
    }

    setSelectionPopup(null);
  };

  // TTS Functions
  const getChapterText = (): string => {
    const article = document.querySelector(".chapter-article");
    if (!article) {
      console.log("No article found");
      return "";
    }

    // Get all paragraphs and headings, excluding links and blockquotes
    const elements = article.querySelectorAll("p, h1, h2");
    const textParts: string[] = [];

    elements.forEach((el) => {
      // Skip if inside blockquote or is a link
      if (el.closest("blockquote") || el.classList.contains("back-link")) {
        return;
      }

      const text = el.textContent?.trim();
      if (text && !text.includes("العودة إلى")) {
        textParts.push(text);
      }
    });

    const fullText = textParts.join(" ");
    console.log("Extracted text length:", fullText.length);
    return fullText;
  };

  const speakNextChunk = (index: number) => {
    if (!isSpeakingRef.current || index >= chunksRef.current.length) {
      console.log("Finished speaking or stopped");
      setTtsState("idle");
      currentUtteranceIndexRef.current = 0;
      isSpeakingRef.current = false;
      return;
    }

    const chunk = chunksRef.current[index];
    console.log(`Speaking chunk ${index + 1}/${chunksRef.current.length}:`, chunk.substring(0, 50));

    const utterance = new SpeechSynthesisUtterance(chunk);
    utterance.lang = "ar-SA";
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    // Try to find Arabic voice
    const voices = window.speechSynthesis.getVoices();
    console.log("Available voices:", voices.length);

    const arabicVoice = voices.find(voice =>
      voice.lang.startsWith("ar") || voice.lang.includes("AR")
    );

    if (arabicVoice) {
      console.log("Using Arabic voice:", arabicVoice.name);
      utterance.voice = arabicVoice;
    } else {
      console.log("No Arabic voice found, using default");
    }

    utterance.onstart = () => {
      console.log("Started speaking chunk", index);
    };

    utterance.onend = () => {
      console.log("Finished chunk", index);
      currentUtteranceIndexRef.current = index + 1;
      // Continue to next chunk
      setTimeout(() => speakNextChunk(index + 1), 100);
    };

    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event);
      setTtsState("idle");
      currentUtteranceIndexRef.current = 0;
      isSpeakingRef.current = false;
    };

    window.speechSynthesis.speak(utterance);
  };

  const startTTS = () => {
    console.log("startTTS called");

    if (typeof window === "undefined" || !window.speechSynthesis) {
      alert("عذراً، متصفحك لا يدعم القراءة الصوتية");
      return;
    }

    const text = getChapterText();
    if (!text) {
      alert("لم يتم العثور على نص للقراءة");
      return;
    }

    // Stop any ongoing speech
    window.speechSynthesis.cancel();
    isSpeakingRef.current = false;

    // Wait a bit for cancel to take effect
    setTimeout(() => {
      // Split text into smaller chunks (every 150 chars approximately)
      const chunks: string[] = [];
      const words = text.split(/\s+/);
      let currentChunk = "";

      words.forEach((word) => {
        if (currentChunk.length + word.length + 1 > 150) {
          if (currentChunk) chunks.push(currentChunk.trim());
          currentChunk = word;
        } else {
          currentChunk += (currentChunk ? " " : "") + word;
        }
      });
      if (currentChunk) chunks.push(currentChunk.trim());

      if (chunks.length === 0) {
        alert("لم يتم العثور على نص للقراءة");
        return;
      }

      console.log("Total chunks:", chunks.length);

      // Store chunks and start speaking
      chunksRef.current = chunks;
      currentUtteranceIndexRef.current = 0;
      isSpeakingRef.current = true;
      setTtsState("playing");

      // Start speaking first chunk
      speakNextChunk(0);
    }, 100);
  };

  const stopTTS = () => {
    console.log("stopTTS called");

    if (typeof window === "undefined" || !window.speechSynthesis) {
      return;
    }

    isSpeakingRef.current = false;
    window.speechSynthesis.cancel();
    chunksRef.current = [];
    utterancesRef.current = [];
    currentUtteranceIndexRef.current = 0;
    setTtsState("idle");
  };

  const pauseTTS = () => {
    console.log("pauseTTS called");

    if (typeof window === "undefined" || !window.speechSynthesis) {
      return;
    }

    isSpeakingRef.current = false;
    window.speechSynthesis.pause();
    setTtsState("paused");
  };

  const resumeTTS = () => {
    console.log("resumeTTS called");

    if (typeof window === "undefined" || !window.speechSynthesis) {
      return;
    }

    isSpeakingRef.current = true;
    window.speechSynthesis.resume();
    setTtsState("playing");
  };

  // Stop TTS when leaving the page or changing chapters
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        isSpeakingRef.current = false;
        window.speechSynthesis.cancel();
      }
    };
  }, [pathname]);

  // Load voices when component mounts
  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      // Load voices
      const voices = window.speechSynthesis.getVoices();
      console.log("Initial voices loaded:", voices.length);

      // Some browsers need this event
      window.speechSynthesis.onvoiceschanged = () => {
        const updatedVoices = window.speechSynthesis.getVoices();
        console.log("Voices updated:", updatedVoices.length);
        updatedVoices.forEach(voice => {
          if (voice.lang.startsWith("ar")) {
            console.log("Arabic voice found:", voice.name, voice.lang);
          }
        });
      };
    }
  }, []);

  if (!isReady) {
    return null;
  }

  // Show controls on home page and chapter pages
  if (!isReadingPage) {
    return null;
  }

  return (
    <>
      <div className="reading-controls" aria-label="إعدادات القراءة">
        {isChapterPage && !isFocus && (
          <Link href="/" className="reading-control-button" aria-label="العودة إلى الفهرس">
            <List size={18} strokeWidth={2.5} />
          </Link>
        )}

        {!isFocus && (
          <button
            aria-label={isDark ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الليلي"}
            aria-pressed={isDark}
            className="reading-control-button"
            type="button"
            onClick={() => setIsDark((current) => !current)}
          >
            {isDark ? <Moon size={18} strokeWidth={2.5} /> : <Sun size={18} strokeWidth={2.5} />}
          </button>
        )}

        <button
          aria-label={isFocus ? "إيقاف وضع التركيز" : "تفعيل وضع التركيز"}
          aria-pressed={isFocus}
          className="reading-control-button"
          type="button"
          onClick={() => setIsFocus((current) => !current)}
        >
          <BookOpen size={18} strokeWidth={2.5} />
        </button>

        {/* TTS Controls - Only on chapter pages */}
        {isChapterPage && !isFocus && (
          <>
            {ttsState === 'idle' ? (
              <button
                aria-label="بدء القراءة الصوتية"
                className="reading-control-button"
                type="button"
                onClick={startTTS}
              >
                <Volume2 size={18} strokeWidth={2.5} />
              </button>
            ) : (
              <button
                aria-label="إيقاف القراءة الصوتية"
                className="reading-control-button"
                type="button"
                onClick={stopTTS}
              >
                <Square size={18} strokeWidth={2.5} />
              </button>
            )}

            {ttsState !== 'idle' && (
              <button
                aria-label={ttsState === 'paused' ? "متابعة القراءة" : "إيقاف مؤقت"}
                className="reading-control-button"
                type="button"
                onClick={ttsState === 'paused' ? resumeTTS : pauseTTS}
              >
                {ttsState === 'paused' ? (
                  <Play size={18} strokeWidth={2.5} />
                ) : (
                  <Pause size={18} strokeWidth={2.5} />
                )}
              </button>
            )}
          </>
        )}

      </div>

      {selectionPopup ? (
        <div
          className="selection-popup"
          style={{
            left: selectionPopup.left,
            top: selectionPopup.top,
          }}
          onMouseDown={(event) => event.preventDefault()}
        >
          <button type="button" onClick={copySelection}>
            نسخ الجملة
          </button>
          <button
            type="button"
            onClick={() => addBookmark(selectionPopup.text, selectionPopup.scrollY)}
          >
            إضافة كعلامة قراءة
          </button>
        </div>
      ) : null}
    </>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type Cleanup = () => void;

function initPage(): Cleanup[] {
  const cleanups: Cleanup[] = [];

  /* --- Header Scroll --- */
  const header = document.getElementById("header");
  const onScroll = () => {
    if (header) header.classList.toggle("scrolled", window.scrollY > 20);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  cleanups.push(() => window.removeEventListener("scroll", onScroll));

  /* --- Mobile Menu --- */
  const burger = document.getElementById("burger");
  const nav = document.querySelector(".nav");
  if (burger && nav) {
    const toggleMenu = () => {
      nav.classList.toggle("active");
      const isOpen = nav.classList.contains("active");
      burger.innerHTML = isOpen
        ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>'
        : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
    };
    burger.addEventListener("click", toggleMenu);
    cleanups.push(() => burger.removeEventListener("click", toggleMenu));

    nav.querySelectorAll(".nav-link").forEach((link) => {
      const close = () => {
        nav.classList.remove("active");
        burger.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
      };
      link.addEventListener("click", close);
      cleanups.push(() => link.removeEventListener("click", close));
    });
  }

  /* --- Scroll Reveal --- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
  cleanups.push(() => revealObserver.disconnect());

  /* --- Current Year --- */
  const yearEl = document.getElementById("current-year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* --- Newsletter Form --- */
  document.querySelectorAll(".newsletter__form").forEach((form) => {
    const handler = function (this: HTMLFormElement, e: Event) {
      e.preventDefault();
      const input = this.querySelector("input") as HTMLInputElement;
      if (input && input.value) {
        input.value = "";
        const btn = this.querySelector("button") as HTMLButtonElement;
        if (btn) {
          const orig = btn.innerHTML;
          btn.innerHTML = "Готово!";
          btn.disabled = true;
          setTimeout(() => { btn.innerHTML = orig; btn.disabled = false; }, 2000);
        }
      }
    };
    form.addEventListener("submit", handler);
    cleanups.push(() => form.removeEventListener("submit", handler));
  });

  /* --- Comment Form --- */
  const commentForm = document.getElementById("comment-form");
  if (commentForm) {
    const handler = function (this: HTMLFormElement, e: Event) {
      e.preventDefault();
      const textarea = this.querySelector("textarea") as HTMLTextAreaElement;
      if (textarea && textarea.value.trim()) {
        const name = this.querySelector('input[name="name"]') as HTMLInputElement;
        const commentsList = document.querySelector(".comments__list");
        if (commentsList) {
          const newComment = document.createElement("div");
          newComment.className = "comment";
          newComment.innerHTML =
            '<div class="comment__avatar grad-3">АВ</div>' +
            '<div class="comment__body">' +
              '<div class="comment__header">' +
                '<span class="comment__name">' + (name ? name.value || "Аноним" : "Аноним") + '</span>' +
                '<span class="comment__date">Только что</span>' +
              '</div>' +
              '<p class="comment__text">' + textarea.value.replace(/</g, "&lt;").replace(/>/g, "&gt;") + '</p>' +
            '</div>';
          commentsList.appendChild(newComment);
          textarea.value = "";
        }
      }
    };
    commentForm.addEventListener("submit", handler);
    cleanups.push(() => commentForm.removeEventListener("submit", handler));
  }

  /* --- Lightbox для галереи --- */
  const gallery = document.getElementById("image-gallery");
  const lightboxEl = document.getElementById("lightbox");
  if (gallery && lightboxEl) {
    const lightbox = lightboxEl;
    const slides = lightbox.querySelector("#lightbox-slides") as HTMLElement;
    const closeBtn = document.getElementById("lightbox-close");
    const prevBtn = document.getElementById("lightbox-prev");
    const nextBtn = document.getElementById("lightbox-next");
    const items = gallery.querySelectorAll(".gallery-item");
    let current = 0;
    const total = items.length;

    function openLightbox(i: number) {
      current = i;
      slides.style.transform = "translateX(-" + (current * 100) + "%)";
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
      lightbox.classList.remove("active");
      document.body.style.overflow = "";
    }

    function goLightbox(dir: number) {
      current = (current + dir + total) % total;
      slides.style.transform = "translateX(-" + (current * 100) + "%)";
    }

    items.forEach((item, i) => {
      item.addEventListener("click", () => openLightbox(i));
    });

    closeBtn?.addEventListener("click", closeLightbox);
    prevBtn?.addEventListener("click", () => goLightbox(-1));
    nextBtn?.addEventListener("click", () => goLightbox(1));

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    const onKeyDown = (e: KeyboardEvent) => {
      if (!lightbox.classList.contains("active")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goLightbox(-1);
      if (e.key === "ArrowRight") goLightbox(1);
    };
    document.addEventListener("keydown", onKeyDown);

    let touchX = 0;
    const onTouchStart = (e: TouchEvent) => { touchX = e.touches[0].clientX; };
    const onTouchEnd = (e: TouchEvent) => {
      const diff = touchX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) goLightbox(diff > 0 ? 1 : -1);
    };
    lightbox.addEventListener("touchstart", onTouchStart, { passive: true });
    lightbox.addEventListener("touchend", onTouchEnd);

    cleanups.push(() => {
      items.forEach((item) => item.removeEventListener("click", () => {}));
      document.removeEventListener("keydown", onKeyDown);
      lightbox.removeEventListener("touchstart", onTouchStart);
      lightbox.removeEventListener("touchend", onTouchEnd);
    });
  }

  /* ========================================
     STACKED SCROLL
     ======================================== */
  const hero = document.querySelector(".hero") as HTMLElement;
  const footer = document.querySelector(".footer") as HTMLElement;
  if (!hero || !footer) {
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";
    document.documentElement.style.height = "auto";
    const s = document.getElementById("init-hide");
    if (s) s.remove();
    // Показать секции без stacked scroll
    document.querySelectorAll(".section, .section--alt").forEach((el) => {
      (el as HTMLElement).style.opacity = "1";
    });
    requestAnimationFrame(() => window.dispatchEvent(new Event("page-ready")));
    return cleanups;
  }

  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  if (isMobile) {
    const ss = document.getElementById("stacked-scroll-css");
    if (ss) ss.remove();
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";
    document.documentElement.style.height = "auto";
    const s = document.getElementById("init-hide");
    if (s) s.remove();
    // Показать секции без stacked scroll
    document.querySelectorAll(".section, .section--alt").forEach((el) => {
      (el as HTMLElement).style.opacity = "1";
    });
    requestAnimationFrame(() => window.dispatchEvent(new Event("page-ready")));
    return cleanups;
  }

  // Inject stacked-scroll-css — overflow:hidden для stacked scroll
  // Скрытие скроллбара уже есть в layout (постоянный CSS)
  let existingStyle = document.getElementById("stacked-scroll-css");
  if (!existingStyle) {
    const style = document.createElement("style");
    style.id = "stacked-scroll-css";
    style.textContent = `@media (min-width: 768px) { html,body{overflow:hidden!important;height:100%!important;scroll-behavior:auto!important} }`;
    document.head.appendChild(style);
  }

  const PAGE_BG = "#0a0a0f";
  const ALT_BG = "#111118";

  function hasBg(el: Element) {
    const bg = getComputedStyle(el).backgroundColor;
    return bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent";
  }
  function expectedBg(el: Element) {
    return el.classList.contains("section--alt") ? ALT_BG : PAGE_BG;
  }
  function ensureBg(el: Element) {
    if (!hasBg(el)) (el as HTMLElement).style.backgroundColor = expectedBg(el);
  }

  const allBlocks: HTMLElement[] = [];
  let el: Element | null = hero.nextElementSibling;
  while (el && el !== footer) {
    // Исключаем lightbox из stacked scroll
    if (!(el as HTMLElement).classList?.contains("lightbox")) {
      allBlocks.push(el as HTMLElement);
    }
    el = el.nextElementSibling;
  }
  if (allBlocks.length === 0) {
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";
    document.documentElement.style.height = "auto";
    const s = document.getElementById("init-hide");
    if (s) s.remove();
    // Показать секции без stacked scroll
    document.querySelectorAll(".section, .section--alt").forEach((el) => {
      (el as HTMLElement).style.opacity = "1";
    });
    requestAnimationFrame(() => window.dispatchEvent(new Event("page-ready")));
    return cleanups;
  }

  ensureBg(hero);
  allBlocks.forEach(function (b) { ensureBg(b); });

  allBlocks.forEach(function (block) {
    const inner = document.createElement("div");
    inner.className = "stacked-inner";
    inner.style.overflowY = "auto";
    inner.style.overflowX = "hidden";
    inner.style.width = "100%";
    inner.style.height = "100%";
    inner.style.padding = "80px 0";
    while (block.firstChild) inner.appendChild(block.firstChild);
    block.appendChild(inner);
  });

  const thinBlocks: HTMLElement[] = [];
  const MERGE_THRESHOLD = 0.3;
  allBlocks.forEach(function (block) {
    const h = block.scrollHeight || block.offsetHeight;
    if (h < window.innerHeight * MERGE_THRESHOLD) thinBlocks.push(block);
  });
  thinBlocks.forEach(function (thin) {
    let prev = thin.previousElementSibling as HTMLElement | null;
    while (prev && (thinBlocks.indexOf(prev) >= 0 || prev === hero)) prev = prev.previousElementSibling as HTMLElement | null;
    if (!prev) return;
    const prevInner = prev.querySelector(".stacked-inner");
    const thinInner = thin.querySelector(".stacked-inner");
    if (!prevInner || !thinInner) return;
    const sep = document.createElement("div");
    sep.style.height = "1px";
    sep.style.background = "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)";
    sep.style.margin = "2rem 0";
    prevInner.appendChild(sep);
    while (thinInner.firstChild) prevInner.appendChild(thinInner.firstChild);
    thin.remove();
  });

  const sections = allBlocks.filter(function (b) { return thinBlocks.indexOf(b) < 0; });
  const totalSections = sections.length;
  sections.forEach(function (s) { ensureBg(s); });

  hero.style.position = "relative";
  hero.style.zIndex = "0";
  hero.style.backgroundColor = "transparent";

  sections.forEach(function (section, i) {
    section.style.position = "fixed";
    section.style.top = "72px";
    section.style.left = "0";
    section.style.right = "0";
    section.style.bottom = "0";
    section.style.padding = "0";
    section.style.overflow = "hidden";
    section.style.zIndex = String(i + 1);
    section.style.transform = "translateY(100vh)";
  });

  footer.style.position = "fixed";
  footer.style.left = "0";
  footer.style.right = "0";
  footer.style.bottom = "0";
  footer.style.zIndex = String(totalSections + 1);
  footer.style.transform = "translateY(100vh)";

  let virtualY = 0;
  let vh = window.innerHeight;
  let maxScroll = 0;
  let phases: Array<{ type: string; idx: number; start: number; end: number; height?: number }> = [];

  function findPhase(type: string, idx: number) {
    for (let p = 0; p < phases.length; p++) {
      if (phases[p].type === type && phases[p].idx === idx) return phases[p];
    }
    return null;
  }

  function buildPhases() {
    vh = window.innerHeight;
    phases = [];
    let offset = 0;
    sections.forEach(function (section, i) {
      const inner = section.querySelector(".stacked-inner") as HTMLElement;
      const contentH = inner ? inner.scrollHeight : 0;
      const visibleH = inner ? inner.clientHeight : vh;
      const internalH = Math.max(0, contentH - visibleH);
      phases.push({ type: "transition", idx: i, start: offset, end: offset + vh });
      offset += vh;
      if (internalH > 10) {
        phases.push({ type: "internal", idx: i, start: offset, end: offset + internalH, height: internalH });
        offset += internalH;
      }
    });
    phases.push({ type: "transition", idx: totalSections, start: offset, end: offset + vh });
    offset += vh;
    maxScroll = offset;
  }

  function render() {
    const y = virtualY;
    hero.style.transform = "translateY(0)";

    sections.forEach(function (section, i) {
      const inner = section.querySelector(".stacked-inner") as HTMLElement;
      const trans = findPhase("transition", i);
      if (!trans) return;
      if (y < trans.start) {
        section.style.transform = "translateY(100vh)";
        if (inner) { inner.scrollTop = 0; inner.style.overflowY = "hidden"; }
      } else if (y < trans.end) {
        section.style.transform = "translateY(" + (vh - (y - trans.start)) + "px)";
        if (inner) { inner.scrollTop = 0; inner.style.overflowY = "hidden"; }
      } else {
        section.style.transform = "translateY(0)";
        const intPhase = findPhase("internal", i);
        if (intPhase && y >= intPhase.start && y < intPhase.end) {
          if (inner) { inner.style.overflowY = "auto"; inner.scrollTop = y - intPhase.start; }
        } else if (intPhase && y >= intPhase.end) {
          if (inner) { inner.scrollTop = intPhase.height!; inner.style.overflowY = "auto"; }
        } else {
          if (inner) { inner.style.overflowY = "hidden"; }
        }
      }
    });

    const fTrans = phases[phases.length - 1];
    if (y < fTrans.start) {
      footer.style.transform = "translateY(100vh)";
    } else if (y < fTrans.end) {
      const progress = (y - fTrans.start) / (fTrans.end - fTrans.start);
      footer.style.transform = "translateY(" + (vh * (1 - progress)) + "px)";
    } else {
      footer.style.transform = "translateY(0)";
    }
  }

  function onWheel(e: WheelEvent) {
    e.preventDefault();
    const delta = e.deltaY;
    for (let k = 0; k < phases.length; k++) {
      const ph = phases[k];
      if (ph.type === "internal" && virtualY >= ph.start && virtualY < ph.end) {
        const inner = sections[ph.idx].querySelector(".stacked-inner") as HTMLElement;
        if (!inner) break;
        const atBottom = inner.scrollTop + inner.clientHeight >= inner.scrollHeight - 5;
        const atTop = inner.scrollTop <= 1;
        if (delta > 0 && !atBottom) { inner.scrollTop += delta; virtualY = ph.start + inner.scrollTop; render(); return; }
        if (delta < 0 && !atTop) { inner.scrollTop += delta; virtualY = ph.start + inner.scrollTop; render(); return; }
        break;
      }
    }
    virtualY = Math.max(0, Math.min(maxScroll, virtualY + delta));
    render();
  }

  function onKeyDown(e: KeyboardEvent) {
    const step = 80;
    if (e.key === "ArrowDown" || e.key === "PageDown") { e.preventDefault(); virtualY = Math.min(maxScroll, virtualY + step); render(); }
    else if (e.key === "ArrowUp" || e.key === "PageUp") { e.preventDefault(); virtualY = Math.max(0, virtualY - step); render(); }
  }

  let touchY0 = 0;
  function onTouchStart(e: TouchEvent) { touchY0 = e.touches[0].clientY; }
  function onTouchMove(e: TouchEvent) {
    e.preventDefault();
    const tY = e.touches[0].clientY;
    const d = (touchY0 - tY) * 2.5;
    touchY0 = tY;
    if (Math.abs(d) > 1) { virtualY = Math.max(0, Math.min(maxScroll, virtualY + d)); render(); }
  }

  function onResize() { buildPhases(); virtualY = Math.min(virtualY, maxScroll); render(); }

  window.addEventListener("wheel", onWheel, { passive: false });
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("touchstart", onTouchStart, { passive: true });
  window.addEventListener("touchmove", onTouchMove, { passive: false });
  window.addEventListener("resize", onResize);

  function onNavClick(e: MouseEvent) {
    const target = (e.target as HTMLElement).closest("[data-nav]") as HTMLElement;
    if (!target) return;
    const href = target.getAttribute("href");
    if (href && href === window.location.pathname) {
      e.preventDefault();
      e.stopPropagation();
      virtualY = 0;
      render();
    }
  }
  document.addEventListener("click", onNavClick, true);

  cleanups.push(() => {
    window.removeEventListener("wheel", onWheel);
    window.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("touchstart", onTouchStart);
    window.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("resize", onResize);
    document.removeEventListener("click", onNavClick);
    // Сброс overflow при уходе со страницы
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
    document.documentElement.style.height = "";
  });

  buildPhases();
  render();

  // Показать секции после позиционирования stacked scroll
  sections.forEach(function (section) {
    section.style.opacity = "1";
  });

  // Сигнал что страница готова (stacked scroll инициализирован)
  requestAnimationFrame(() => {
    const s = document.getElementById("init-hide");
    if (s) s.remove();
    window.dispatchEvent(new Event("page-ready"));
  });

  return cleanups;
}

export function SiteEffects() {
  const pathname = usePathname();
  const prevCleanup = useRef<Cleanup[]>([]);

  useEffect(() => {
    // Clean up previous effects
    prevCleanup.current.forEach((fn) => fn());
    prevCleanup.current = [];

    // Wait for Next.js to render new page content
    const timer = setTimeout(() => {
      prevCleanup.current = initPage();
    }, 100);

    return () => {
      clearTimeout(timer);
      prevCleanup.current.forEach((fn) => fn());
      prevCleanup.current = [];
    };
  }, [pathname]);

  return null;
}

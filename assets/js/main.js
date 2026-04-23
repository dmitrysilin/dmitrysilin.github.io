document.addEventListener("DOMContentLoaded", function () {
    var LAST_UPDATED = "2026-04-23";
    var SITE_URL = "https://iloveqa.ru/";
    var API_PATH = "api/about_me.json";
    var API_URL = SITE_URL + API_PATH;
    var API_ENDPOINT = "./" + API_PATH;
    var pageType = document.body && document.body.getAttribute("data-page") === "404" ? "not-found" : "home";
    var isLocalFile = window.location && window.location.protocol === "file:";

    var languageButtons = document.querySelectorAll("[data-lang-switch]");
    var accessibilityToggle = document.querySelector("[data-accessibility-toggle]");
    var themeToggle = document.querySelector("[data-theme-toggle]");
    var main = document.querySelector(".page");
    var links = document.querySelector(".links");
    var profileName = document.querySelector("[data-profile-name]");
    var profileRole = document.querySelector("[data-profile-role]");
    var telegramLink = document.querySelector("[data-link-telegram]");
    var emailButton = document.querySelector("[data-copy-email]");
    var shareButton = document.querySelector("[data-share-page]");
    var footerWishlist = document.querySelector("[data-footer-wishlist]");
    var statusRegion = document.querySelector("[data-status-region]");
    var footerScanline = document.querySelector(".footer-scanline");
    var stackBlock = document.querySelector("[data-stack-block]");
    var stackLabel = document.querySelector("[data-i18n='stack_label']");
    var stackToggleButton = document.querySelector("[data-toggle-stack]");
    var stackPanel = document.querySelector("[data-stack-panel]");
    var stackGroups = document.querySelector("[data-stack-groups]");
    var experienceBlock = document.querySelector("[data-experience-block]");
    var experienceLabel = document.querySelector("[data-i18n='experience_label']");
    var experienceToggleButton = document.querySelector("[data-toggle-experience]");
    var experiencePanel = document.querySelector("[data-experience-panel]");
    var experienceList = document.querySelector("[data-experience-list]");
    var projectsBlock = document.querySelector("[data-projects-block]");
    var projectsLabel = document.querySelector("[data-i18n='projects_label']");
    var projectsToggleButton = document.querySelector("[data-toggle-projects]");
    var projectsPanel = document.querySelector("[data-projects-panel]");
    var projectsList = document.querySelector("[data-projects-list]");
    var apiBlock = document.querySelector("[data-api-block]");
    var apiLabel = document.querySelector("[data-i18n='api_label']");
    var apiCommand = document.querySelector("[data-api-command]");
    var copyButton = document.querySelector("[data-copy-curl]");
    var toggleButton = document.querySelector("[data-toggle-api]");
    var runButton = document.querySelector("[data-run-api]");
    var apiPanel = document.querySelector("[data-api-panel]");
    var response = document.querySelector("[data-api-response]");
    var lastUpdated = document.querySelector("[data-last-updated]");
    var notFoundCode = document.querySelector("[data-not-found-code]");
    var notFoundTitle = document.querySelector("[data-not-found-title]");
    var notFoundText = document.querySelector("[data-not-found-text]");
    var homeLink = document.querySelector("[data-home-link]");
    var qaPanel = document.querySelector("[data-qa-panel]");
    var qaTitle = document.querySelector("[data-qa-title]");
    var qaBody = document.querySelector("[data-qa-body]");
    var embeddedProfileScript = document.querySelector("#profile-data");
    var structuredData = document.querySelector("#structured-data");
    var metaDescription = document.querySelector('meta[name="description"]');
    var themeColor = document.querySelector('meta[name="theme-color"]');
    var ogLocale = document.querySelector('meta[property="og:locale"]');
    var ogSiteName = document.querySelector('meta[property="og:site_name"]');
    var ogTitle = document.querySelector('meta[property="og:title"]');
    var ogDescription = document.querySelector('meta[property="og:description"]');
    var ogUrl = document.querySelector('meta[property="og:url"]');
    var ogImageAlt = document.querySelector('meta[property="og:image:alt"]');
    var twitterTitle = document.querySelector('meta[name="twitter:title"]');
    var twitterDescription = document.querySelector('meta[name="twitter:description"]');
    var twitterImageAlt = document.querySelector('meta[name="twitter:image:alt"]');
    var themeMedia = window.matchMedia ? window.matchMedia("(prefers-color-scheme: light)") : null;
    var contrastMedia = window.matchMedia ? window.matchMedia("(prefers-contrast: more)") : null;
    var forcedColorsMedia = window.matchMedia ? window.matchMedia("(forced-colors: active)") : null;
    var touchLikeMedia = window.matchMedia ? window.matchMedia("(hover: none), (pointer: coarse)") : null;
    var reducedMotionMedia = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;

    var currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    var currentAccessibility = document.documentElement.getAttribute("data-accessibility") || "off";
    var currentLang = "ru";
    var stackExpanded = false;
    var experienceExpanded = false;
    var projectsExpanded = false;
    var apiExpanded = false;
    var qaVisible = false;
    var qaSequence = "";
    var profileData = null;
    var profilePromise = null;
    var statusTimer = 0;
    var scanlineTimer = 0;

    var translations = {
        ru: {
            htmlLang: "ru",
            pageLabel: {
                home: "Личный сайт Дмитрия Силина",
                "not-found": "Страница не найдена"
            },
            linksLabel: "Ссылки и действия",
            nameFallback: "Дмитрий Силин",
            roleFallback: "QA-инженер",
            roleCurrentFallback: "Т-Банке",
            roleJoiner: "в",
            telegram: "Телеграм",
            email: "Почта",
            share: "Поделиться",
            wishlist: "Вишлист",
            stackLabel: "Стек",
            experienceLabel: "Опыт",
            projectsLabel: "Личные проекты",
            apiLabel: "GET /api/about_me.json",
            block: {
                expand: "Раскрыть",
                hide: "Скрыть"
            },
            api: {
                copy: "Копировать",
                run: "Запустить",
                loading: "Загрузка",
                fetchError: "Не удалось получить /api/about_me.json"
            },
            shareStatus: {
                shared: "Окно шаринга открыто"
            },
            status: {
                emailCopied: "Почта скопирована",
                linkCopied: "Ссылка скопирована",
                curlCopied: "curl скопирован",
                jsonLoaded: "JSON загружен",
                copyError: "Не удалось скопировать",
                shareError: "Не удалось поделиться",
                jsonError: "Не удалось получить /api/about_me.json"
            },
            footerUpdated: "Обновлено",
            theme: {
                light: "Включить светлую тему",
                dark: "Включить тёмную тему"
            },
            accessibility: {
                on: "Включить режим для слабовидящих",
                off: "Выключить режим для слабовидящих"
            },
            pages: {
                home: {
                    description: "Личный сайт Дмитрия Силина",
                    ogDescription: "Минималистичный личный сайт QA-инженера Дмитрия Силина",
                    imageAlt: "Превью сайта Дмитрия Силина"
                },
                "not-found": {
                    documentTitle: "404 | Дмитрий Силин",
                    metaDescription: "Страница не найдена на сайте Дмитрия Силина",
                    ogTitle: "404 | Дмитрий Силин",
                    ogDescription: "Страница не найдена",
                    imageAlt: "404 страница сайта Дмитрия Силина"
                }
            },
            notFound: {
                code: "404",
                title: "Страница не найдена",
                text: "Похоже, здесь пусто. Можно вернуться на главную или открыть Telegram.",
                home: "На главную"
            },
            easter: {
                status: "статус",
                language: "язык",
                endpoint: "эндпоинт",
                runtime: "рантайм",
                updated: "обновлено",
                hint: "подсказка",
                ready: "готов",
                hintValue: "esc чтобы закрыть",
                messages: [
                    "Пусть сегодня всё складывается спокойно.",
                    "У вас очень хороший инженерный взгляд.",
                    "Пусть баги находятся раньше релиза.",
                    "Сегодня вы особенно точны в деталях.",
                    "Пусть сложное быстро становится ясным.",
                    "У вас редкое спокойствие в работе.",
                    "Пусть проверки радуют чистыми результатами.",
                    "Сегодня у вас отличный темп и фокус.",
                    "Пусть решения находятся без лишней суеты.",
                    "У вас сильное чувство качества.",
                    "Пусть день будет продуктивным и лёгким.",
                    "Сегодня вы особенно внимательны к важному.",
                    "Пусть коммуникация будет ясной и тёплой.",
                    "У вас хороший вкус к аккуратным процессам.",
                    "Пусть любая неясность быстро проясняется.",
                    "Сегодня вам особенно идут сложные задачи.",
                    "Пусть релизы проходят ровно и чисто.",
                    "У вас надёжный профессиональный стиль.",
                    "Пусть день принесёт маленькую гордость за себя.",
                    "Сегодня всё нужное заметится вовремя."
                ]
            }
        },
        en: {
            htmlLang: "en",
            pageLabel: {
                home: "Personal website of Dmitry Silin",
                "not-found": "Page not found"
            },
            linksLabel: "Links and actions",
            nameFallback: "Dmitry Silin",
            roleFallback: "QA engineer",
            roleCurrentFallback: "T-Bank",
            roleJoiner: "at",
            telegram: "Telegram",
            email: "Email",
            share: "Share",
            wishlist: "Wishlist",
            stackLabel: "Stack",
            experienceLabel: "Experience",
            projectsLabel: "Personal projects",
            apiLabel: "GET /api/about_me.json",
            block: {
                expand: "Expand",
                hide: "Hide"
            },
            api: {
                copy: "Copy",
                run: "Run",
                loading: "Loading",
                fetchError: "Unable to fetch /api/about_me.json"
            },
            shareStatus: {
                shared: "Share sheet opened"
            },
            status: {
                emailCopied: "Email copied",
                linkCopied: "Link copied",
                curlCopied: "curl copied",
                jsonLoaded: "JSON loaded",
                copyError: "Could not copy",
                shareError: "Could not share",
                jsonError: "Unable to fetch /api/about_me.json"
            },
            footerUpdated: "Updated",
            theme: {
                light: "Switch to light theme",
                dark: "Switch to dark theme"
            },
            accessibility: {
                on: "Enable accessibility mode",
                off: "Disable accessibility mode"
            },
            pages: {
                home: {
                    description: "Personal website of Dmitry Silin",
                    ogDescription: "Minimal personal website of QA engineer Dmitry Silin",
                    imageAlt: "Preview card of Dmitry Silin's website"
                },
                "not-found": {
                    documentTitle: "404 | Dmitry Silin",
                    metaDescription: "Page not found on Dmitry Silin's website",
                    ogTitle: "404 | Dmitry Silin",
                    ogDescription: "Page not found",
                    imageAlt: "404 page of Dmitry Silin's website"
                }
            },
            notFound: {
                code: "404",
                title: "Page not found",
                text: "Looks like there is nothing here. You can go back home or open Telegram.",
                home: "Back home"
            },
            easter: {
                status: "status",
                language: "language",
                endpoint: "endpoint",
                runtime: "runtime",
                updated: "updated",
                hint: "hint",
                ready: "ready",
                hintValue: "press esc to close",
                messages: [
                    "May today unfold calmly for you.",
                    "You have a strong engineering eye.",
                    "May bugs show up before release.",
                    "You are especially sharp with details today.",
                    "May complex things become clear quickly.",
                    "You bring rare calm to your work.",
                    "May your checks come back clean.",
                    "You have great pace and focus today.",
                    "May solutions arrive without extra stress.",
                    "You have a strong sense of quality.",
                    "May the day feel productive and light.",
                    "You are noticing what matters today.",
                    "May communication stay clear and warm.",
                    "You have good taste in clean processes.",
                    "May every ambiguity resolve quickly.",
                    "Complex tasks suit you especially well today.",
                    "May releases go smoothly and cleanly.",
                    "Your professional style feels reliable.",
                    "May today bring a small moment of pride.",
                    "You will notice the right thing in time today."
                ]
            }
        }
    };

    function detectBrowserLanguage() {
        var browserLanguages = [];

        if (Array.isArray(navigator.languages) && navigator.languages.length > 0) {
            browserLanguages = navigator.languages;
        } else if (navigator.language) {
            browserLanguages = [navigator.language];
        }

        for (var index = 0; index < browserLanguages.length; index += 1) {
            var value = String(browserLanguages[index] || "").toLowerCase();

            if (value.indexOf("en") === 0) {
                return "en";
            }

            if (value.indexOf("ru") === 0) {
                return "ru";
            }
        }

        return "ru";
    }

    function readEmbeddedProfileData() {
        if (!embeddedProfileScript) {
            return null;
        }

        try {
            return JSON.parse(embeddedProfileScript.textContent);
        } catch (error) {
            return null;
        }
    }

    function getSavedLanguage() {
        try {
            var saved = window.localStorage.getItem("site-language");
            if (saved && translations[saved]) {
                return saved;
            }
        } catch (error) {}

        return detectBrowserLanguage();
    }

    function detectSystemTheme() {
        if (themeMedia && themeMedia.matches) {
            return "light";
        }

        return "dark";
    }

    function detectSystemAccessibility() {
        if ((contrastMedia && contrastMedia.matches) || (forcedColorsMedia && forcedColorsMedia.matches)) {
            return "on";
        }

        return "off";
    }

    function getSavedTheme() {
        try {
            var saved = window.localStorage.getItem("site-theme");

            if (saved === "light" || saved === "dark") {
                return saved;
            }
        } catch (error) {}

        return "";
    }

    function getSavedAccessibility() {
        try {
            var saved = window.localStorage.getItem("site-accessibility");

            if (saved === "on" || saved === "off") {
                return saved;
            }
        } catch (error) {}

        return "";
    }

    function saveLanguage(lang) {
        try {
            window.localStorage.setItem("site-language", lang);
        } catch (error) {}
    }

    function saveTheme(theme) {
        try {
            window.localStorage.setItem("site-theme", theme);
        } catch (error) {}
    }

    function saveAccessibility(value) {
        try {
            window.localStorage.setItem("site-accessibility", value);
        } catch (error) {}
    }

    function getLocalizedValue(value, lang) {
        if (value == null) {
            return "";
        }

        if (typeof value === "string") {
            return value;
        }

        if (Array.isArray(value)) {
            return value;
        }

        if (typeof value === "object") {
            return value[lang] || value.ru || value.en || "";
        }

        return String(value);
    }

    function formatDate(value, lang) {
        var dateValue = value || LAST_UPDATED;

        if (lang === "ru") {
            return dateValue.split("-").reverse().join(".");
        }

        return dateValue;
    }

    function buildRoleText(text, profile) {
        var roleBase = profile ? getLocalizedValue(profile.role, currentLang) : text.roleFallback;
        var currentCompany = text.roleCurrentFallback || "";

        if (profile && Array.isArray(profile.experience) && profile.experience.length > 0) {
            currentCompany =
                getLocalizedValue(profile.experience[0].role_company, currentLang) ||
                getLocalizedValue(profile.experience[0].company, currentLang);
        }

        return currentCompany ? roleBase + " " + text.roleJoiner + " " + currentCompany : roleBase;
    }

    function getProfileName(profile, text) {
        return profile ? getLocalizedValue(profile.name, currentLang) : text.nameFallback;
    }

    function getProfileUpdatedAt(profile) {
        return profile && profile.updated_at ? profile.updated_at : LAST_UPDATED;
    }

    function updateLanguageButtons() {
        languageButtons.forEach(function (button) {
            var isActive = button.getAttribute("data-lang-switch") === currentLang;
            button.classList.toggle("is-active", isActive);
            button.setAttribute("aria-pressed", isActive ? "true" : "false");
        });
    }

    function blurAfterTap(element) {
        if (!element || !touchLikeMedia || !touchLikeMedia.matches || typeof element.blur !== "function") {
            return;
        }

        window.setTimeout(function () {
            element.blur();
        }, 0);
    }

    function updateThemeToggle() {
        if (!themeToggle) {
            return;
        }

        var themeText = translations[currentLang].theme;
        var nextTheme = currentTheme === "dark" ? "light" : "dark";
        var label = nextTheme === "light" ? themeText.light : themeText.dark;

        themeToggle.setAttribute("aria-label", label);
        themeToggle.setAttribute("title", label);
        themeToggle.setAttribute("aria-pressed", currentTheme === "light" ? "true" : "false");
    }

    function updateAccessibilityToggle() {
        if (!accessibilityToggle) {
            return;
        }

        var accessibilityText = translations[currentLang].accessibility;
        var label = currentAccessibility === "on" ? accessibilityText.off : accessibilityText.on;

        accessibilityToggle.setAttribute("aria-label", label);
        accessibilityToggle.setAttribute("title", label);
        accessibilityToggle.setAttribute("aria-pressed", currentAccessibility === "on" ? "true" : "false");
    }

    function applyTheme(theme, persist) {
        currentTheme = theme === "light" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", currentTheme);

        if (themeColor) {
            themeColor.setAttribute("content", currentTheme === "light" ? "#f7f2ea" : "#0a0a0a");
        }

        updateThemeToggle();

        if (persist) {
            saveTheme(currentTheme);
        }
    }

    function applyAccessibility(value, persist) {
        currentAccessibility = value === "on" ? "on" : "off";
        document.documentElement.setAttribute("data-accessibility", currentAccessibility);
        updateAccessibilityToggle();

        if (persist) {
            saveAccessibility(currentAccessibility);
        }
    }

    function clearStatus() {
        if (!statusRegion) {
            return;
        }

        window.clearTimeout(statusTimer);
        statusRegion.textContent = "";
        statusRegion.classList.remove("is-visible");
    }

    function showStatus(message) {
        if (!statusRegion || !message) {
            return;
        }

        window.clearTimeout(statusTimer);
        statusRegion.textContent = message;
        statusRegion.classList.add("is-visible");
        statusTimer = window.setTimeout(clearStatus, 2200);
    }

    function clearScanlineTimer() {
        if (!scanlineTimer) {
            return;
        }

        window.clearTimeout(scanlineTimer);
        scanlineTimer = 0;
    }

    function animateScanline() {
        if (!footerScanline) {
            return;
        }

        clearScanlineTimer();

        if (reducedMotionMedia && reducedMotionMedia.matches) {
            footerScanline.style.setProperty("--scan-left", "38%");
            footerScanline.style.setProperty("--scan-width", "22%");
            footerScanline.style.setProperty("--scan-opacity", "0.4");
            footerScanline.style.setProperty("--scan-duration", "0ms");
            return;
        }

        function movePulse() {
            var width = 12 + Math.random() * 34;
            var left = -8 + Math.random() * 104;
            var opacity = 0.18 + Math.random() * 0.68;
            var duration = 720 + Math.floor(Math.random() * 2100);

            footerScanline.style.setProperty("--scan-left", left.toFixed(2) + "%");
            footerScanline.style.setProperty("--scan-width", width.toFixed(2) + "%");
            footerScanline.style.setProperty("--scan-opacity", opacity.toFixed(2));
            footerScanline.style.setProperty("--scan-duration", duration + "ms");

            scanlineTimer = window.setTimeout(movePulse, Math.max(260, Math.round(duration * (0.45 + Math.random() * 0.5))));
        }

        movePulse();
    }

    function updateLastUpdated(profile) {
        if (!lastUpdated) {
            return;
        }

        lastUpdated.textContent =
            translations[currentLang].footerUpdated + " " + formatDate(getProfileUpdatedAt(profile), currentLang);
    }

    function renderStackGroups(profile) {
        if (!stackGroups || !profile || !Array.isArray(profile.stack_groups)) {
            return;
        }

        stackGroups.replaceChildren();

        profile.stack_groups.forEach(function (group) {
            var groupElement = document.createElement("article");
            var label = document.createElement("p");
            var items = document.createElement("p");

            groupElement.className = "stack-group";
            label.className = "stack-group-label";
            items.className = "stack-group-items";

            label.textContent = getLocalizedValue(group.label, currentLang);
            items.textContent = Array.isArray(group.items) ? group.items.join(", ") : "";

            groupElement.appendChild(label);
            groupElement.appendChild(items);
            stackGroups.appendChild(groupElement);
        });
    }

    function renderExperience(profile) {
        if (!experienceList || !profile || !Array.isArray(profile.experience)) {
            return;
        }

        experienceList.replaceChildren();

        profile.experience.forEach(function (item) {
            var listItem = document.createElement("li");
            var period = document.createElement("span");
            var company = document.createElement("span");

            listItem.className = "experience-item";
            period.className = "experience-period";
            company.className = "experience-company";

            period.textContent = getLocalizedValue(item.period, currentLang);
            company.textContent = getLocalizedValue(item.company, currentLang);

            listItem.appendChild(period);
            listItem.appendChild(company);
            experienceList.appendChild(listItem);
        });
    }

    function renderProjects(profile) {
        if (!projectsList || !profile || !Array.isArray(profile.projects)) {
            return;
        }

        projectsList.replaceChildren();

        profile.projects.forEach(function (project) {
            var listItem = document.createElement("li");
            var link = document.createElement("a");

            link.className = "project-link";
            link.href = project.url || "#";
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.textContent = getLocalizedValue(project.title, currentLang);

            listItem.appendChild(link);
            projectsList.appendChild(listItem);
        });
    }

    function updateStructuredData(profile) {
        if (!structuredData || !profile) {
            return;
        }

        var structured = {
            "@context": "https://schema.org",
            "@type": "Person",
            name: getLocalizedValue(profile.name, currentLang),
            jobTitle: getLocalizedValue(profile.role, currentLang),
            url: SITE_URL,
            address: {
                "@type": "PostalAddress",
                addressLocality: getLocalizedValue(profile.city, currentLang),
                addressCountry: profile.country_code || "RU"
            },
            email: profile.contacts ? profile.contacts.email : "",
            sameAs: profile.contacts
                ? [profile.contacts.telegram, profile.contacts.wishlist].filter(Boolean)
                : []
        };

        structuredData.textContent = JSON.stringify(structured, null, 2);
    }

    function updateHeadText(text) {
        var nameText = getProfileName(profileData, text);
        var roleText = buildRoleText(text, profileData);
        var pageMeta;

        if (pageType === "not-found") {
            pageMeta = text.pages["not-found"];
        } else {
            pageMeta = {
                documentTitle: nameText + " | " + roleText,
                metaDescription: text.pages.home.description,
                ogTitle: nameText + " — " + roleText,
                ogDescription: text.pages.home.ogDescription,
                imageAlt: text.pages.home.imageAlt
            };
        }

        document.documentElement.lang = text.htmlLang;
        document.title = pageMeta.documentTitle;

        if (metaDescription) {
            metaDescription.setAttribute("content", pageMeta.metaDescription);
        }

        if (ogLocale) {
            ogLocale.setAttribute("content", currentLang === "ru" ? "ru_RU" : "en_US");
        }

        if (ogSiteName) {
            ogSiteName.setAttribute("content", nameText);
        }

        if (ogTitle) {
            ogTitle.setAttribute("content", pageMeta.ogTitle);
        }

        if (ogDescription) {
            ogDescription.setAttribute("content", pageMeta.ogDescription);
        }

        if (ogUrl) {
            ogUrl.setAttribute("content", window.location.href);
        }

        if (ogImageAlt) {
            ogImageAlt.setAttribute("content", pageMeta.imageAlt);
        }

        if (twitterTitle) {
            twitterTitle.setAttribute("content", pageMeta.ogTitle);
        }

        if (twitterDescription) {
            twitterDescription.setAttribute("content", pageMeta.ogDescription);
        }

        if (twitterImageAlt) {
            twitterImageAlt.setAttribute("content", pageMeta.imageAlt);
        }
    }

    function syncDetailState(block, button, panel, expanded) {
        if (!block || !button || !panel) {
            return;
        }

        var text = translations[currentLang].block;
        var prefix = expanded ? "− " : "+ ";

        block.dataset.expanded = expanded ? "true" : "false";
        button.textContent = prefix + (expanded ? text.hide : text.expand);
        button.setAttribute("aria-expanded", expanded ? "true" : "false");
        panel.hidden = !expanded;
    }

    function syncExperienceState() {
        syncDetailState(experienceBlock, experienceToggleButton, experiencePanel, experienceExpanded);
    }

    function syncStackState() {
        syncDetailState(stackBlock, stackToggleButton, stackPanel, stackExpanded);
    }

    function syncProjectsState() {
        syncDetailState(projectsBlock, projectsToggleButton, projectsPanel, projectsExpanded);
    }

    function syncApiState() {
        syncDetailState(apiBlock, toggleButton, apiPanel, apiExpanded);

        if (runButton) {
            runButton.hidden = !apiExpanded;
            runButton.textContent = translations[currentLang].api.run;
        }
    }

    function renderNotFound(text) {
        if (notFoundCode) {
            notFoundCode.textContent = text.notFound.code;
        }

        if (notFoundTitle) {
            notFoundTitle.textContent = text.notFound.title;
        }

        if (notFoundText) {
            notFoundText.textContent = text.notFound.text;
        }

        if (homeLink) {
            homeLink.textContent = text.notFound.home;
        }
    }

    function renderProfile(text) {
        if (profileName) {
            profileName.textContent = getProfileName(profileData, text);
        }

        if (profileRole) {
            profileRole.textContent = buildRoleText(text, profileData);
        }

        if (telegramLink) {
            telegramLink.textContent = text.telegram;
            telegramLink.href = profileData && profileData.contacts ? profileData.contacts.telegram : "https://t.me/iloveQA";
        }

        if (emailButton) {
            emailButton.textContent = text.email;
        }

        if (shareButton) {
            shareButton.textContent = text.share;
        }

        if (footerWishlist) {
            footerWishlist.textContent = text.wishlist;
            footerWishlist.href =
                profileData && profileData.contacts
                    ? profileData.contacts.wishlist
                    : "https://buildin.ai/share/7a50c95d-e784-407c-985e-efef949e534b#8b2dbb4d-b0ec-4b53-918e-034baf79118b";
        }

        if (stackLabel) {
            stackLabel.textContent = text.stackLabel;
        }

        if (experienceLabel) {
            experienceLabel.textContent = text.experienceLabel;
        }

        if (projectsLabel) {
            projectsLabel.textContent = text.projectsLabel;
        }

        if (apiLabel) {
            apiLabel.textContent = text.apiLabel;
        }

        if (copyButton) {
            copyButton.textContent = text.api.copy;
        }

        if (apiCommand) {
            apiCommand.textContent = "curl " + API_URL;
        }

        updateLastUpdated(profileData);
        renderStackGroups(profileData);
        renderExperience(profileData);
        renderProjects(profileData);
        updateStructuredData(profileData);
        renderNotFound(text);
    }

    function applyLanguage(lang) {
        var text = translations[lang];
        currentLang = lang;

        if (main) {
            main.setAttribute("aria-label", text.pageLabel[pageType]);
        }

        if (links) {
            links.setAttribute("aria-label", text.linksLabel);
        }

        clearStatus();
        updateHeadText(text);
        renderProfile(text);
        updateLanguageButtons();
        updateThemeToggle();
        updateAccessibilityToggle();
        syncStackState();
        syncExperienceState();
        syncProjectsState();
        syncApiState();
        renderQaPanel();
        saveLanguage(lang);
    }

    function getDailyMessage(messages) {
        if (!Array.isArray(messages) || messages.length === 0) {
            return "";
        }

        var now = new Date();
        var seed = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("-");
        var hash = 0;

        for (var index = 0; index < seed.length; index += 1) {
            hash = (hash * 31 + seed.charCodeAt(index)) >>> 0;
        }

        return messages[hash % messages.length];
    }

    function renderQaPanel() {
        if (!qaPanel || !qaTitle || !qaBody) {
            return;
        }

        var text = translations[currentLang].easter;
        var message = getDailyMessage(text.messages);

        qaTitle.textContent = message;
        qaBody.textContent = [
            text.status + ": " + text.ready,
            text.language + ": " + currentLang.toUpperCase(),
            text.endpoint + ": /api/about_me.json",
            text.runtime + ": GitHub Pages",
            text.updated + ": " + formatDate(getProfileUpdatedAt(profileData), currentLang),
            text.hint + ": " + text.hintValue
        ].join("\n");
    }

    function setQaVisible(value) {
        if (!qaPanel) {
            return;
        }

        qaVisible = value;
        qaPanel.hidden = !qaVisible;

        if (qaVisible) {
            renderQaPanel();
        }
    }

    function copyText(value) {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(value);
        }

        return new Promise(function (resolve, reject) {
            var textarea = document.createElement("textarea");
            textarea.value = value;
            textarea.setAttribute("readonly", "");
            textarea.style.position = "absolute";
            textarea.style.left = "-9999px";
            document.body.appendChild(textarea);
            textarea.select();

            try {
                var success = document.execCommand("copy");
                document.body.removeChild(textarea);

                if (success) {
                    resolve();
                    return;
                }
            } catch (error) {
                document.body.removeChild(textarea);
                reject(error);
                return;
            }

            reject(new Error("Copy failed"));
        });
    }

    function requestProfile(forceFresh) {
        if (isLocalFile && profileData) {
            return Promise.resolve(profileData);
        }

        if (profilePromise && !forceFresh) {
            return profilePromise;
        }

        profilePromise = fetch(API_ENDPOINT, {
            headers: {
                Accept: "application/json"
            }
        })
            .then(function (result) {
                if (!result.ok) {
                    throw new Error("Request failed");
                }

                return result.json();
            })
            .then(function (data) {
                profileData = data;
                return data;
            }, function (error) {
                profilePromise = null;

                if (profileData) {
                    return profileData;
                }

                throw error;
            });

        return profilePromise;
    }

    currentLang = getSavedLanguage();
    profileData = readEmbeddedProfileData();
    currentTheme = getSavedTheme() || currentTheme || detectSystemTheme();
    currentAccessibility = getSavedAccessibility() || currentAccessibility || detectSystemAccessibility();
    applyTheme(currentTheme, false);
    applyAccessibility(currentAccessibility, false);
    animateScanline();
    applyLanguage(currentLang);

    requestProfile(false)
        .then(function () {
            applyLanguage(currentLang);
        }, function () {});

    if (copyButton) {
        copyButton.addEventListener("click", function () {
            copyText("curl " + API_URL)
                .then(function () {
                    showStatus(translations[currentLang].status.curlCopied);
                }, function () {
                    showStatus(translations[currentLang].status.copyError);
                });
        });
    }

    if (emailButton) {
        emailButton.addEventListener("click", function () {
            var email =
                profileData && profileData.contacts && profileData.contacts.email
                    ? profileData.contacts.email
                    : "qa.silin@ya.ru";

            copyText(email)
                .then(function () {
                    showStatus(translations[currentLang].status.emailCopied);
                }, function () {
                    showStatus(translations[currentLang].status.copyError);
                });
        });
    }

    if (shareButton) {
        shareButton.addEventListener("click", function () {
            var text = translations[currentLang];

            if (navigator.share) {
                navigator
                    .share({
                        title: document.title,
                        text: metaDescription ? metaDescription.getAttribute("content") : "",
                        url: SITE_URL
                    })
                    .then(function () {
                        showStatus(text.shareStatus.shared);
                    }, function (error) {
                        if (error && error.name === "AbortError") {
                            return;
                        }

                        showStatus(text.status.shareError);
                    });

                return;
            }

            copyText(SITE_URL)
                .then(function () {
                    showStatus(text.status.linkCopied);
                }, function () {
                    showStatus(text.status.shareError);
                });
        });
    }

    languageButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            var lang = button.getAttribute("data-lang-switch");

            if (!lang || !translations[lang] || lang === currentLang) {
                return;
            }

            applyLanguage(lang);
        });
    });

    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            applyTheme(currentTheme === "dark" ? "light" : "dark", true);
            blurAfterTap(themeToggle);
        });
    }

    if (accessibilityToggle) {
        accessibilityToggle.addEventListener("click", function () {
            applyAccessibility(currentAccessibility === "on" ? "off" : "on", true);
            blurAfterTap(accessibilityToggle);
        });
    }

    if (themeMedia) {
        var handleThemeChange = function (event) {
            if (getSavedTheme()) {
                return;
            }

            applyTheme(event.matches ? "light" : "dark", false);
        };

        if (typeof themeMedia.addEventListener === "function") {
            themeMedia.addEventListener("change", handleThemeChange);
        } else if (typeof themeMedia.addListener === "function") {
            themeMedia.addListener(handleThemeChange);
        }
    }

    var handleAccessibilityChange = function () {
        if (getSavedAccessibility()) {
            return;
        }

        applyAccessibility(detectSystemAccessibility(), false);
    };

    if (contrastMedia) {
        if (typeof contrastMedia.addEventListener === "function") {
            contrastMedia.addEventListener("change", handleAccessibilityChange);
        } else if (typeof contrastMedia.addListener === "function") {
            contrastMedia.addListener(handleAccessibilityChange);
        }
    }

    if (forcedColorsMedia) {
        if (typeof forcedColorsMedia.addEventListener === "function") {
            forcedColorsMedia.addEventListener("change", handleAccessibilityChange);
        } else if (typeof forcedColorsMedia.addListener === "function") {
            forcedColorsMedia.addListener(handleAccessibilityChange);
        }
    }

    if (reducedMotionMedia) {
        var handleReducedMotionChange = function () {
            animateScanline();
        };

        if (typeof reducedMotionMedia.addEventListener === "function") {
            reducedMotionMedia.addEventListener("change", handleReducedMotionChange);
        } else if (typeof reducedMotionMedia.addListener === "function") {
            reducedMotionMedia.addListener(handleReducedMotionChange);
        }
    }

    if (experienceToggleButton) {
        experienceToggleButton.addEventListener("click", function () {
            experienceExpanded = !experienceExpanded;
            syncExperienceState();
        });
    }

    if (stackToggleButton) {
        stackToggleButton.addEventListener("click", function () {
            stackExpanded = !stackExpanded;
            syncStackState();
        });
    }

    if (projectsToggleButton) {
        projectsToggleButton.addEventListener("click", function () {
            projectsExpanded = !projectsExpanded;
            syncProjectsState();
        });
    }

    if (toggleButton) {
        toggleButton.addEventListener("click", function () {
            apiExpanded = !apiExpanded;
            syncApiState();
        });
    }

    if (runButton && response) {
        runButton.addEventListener("click", function () {
            runButton.disabled = true;
            runButton.textContent = translations[currentLang].api.loading;

            requestProfile(true)
                .then(function (data) {
                    response.hidden = false;
                    response.textContent = JSON.stringify(data, null, 2);
                    showStatus(translations[currentLang].status.jsonLoaded);
                    applyLanguage(currentLang);
                }, function () {
                    response.hidden = false;
                    response.textContent = JSON.stringify(
                        {
                            error: translations[currentLang].api.fetchError
                        },
                        null,
                        2
                    );
                    showStatus(translations[currentLang].status.jsonError);
                })
                .then(function () {
                    runButton.disabled = false;
                    runButton.textContent = translations[currentLang].api.run;
                });
        });
    }

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            setQaVisible(false);
            qaSequence = "";
            return;
        }

        if (event.ctrlKey || event.metaKey || event.altKey) {
            return;
        }

        var target = event.target;
        if (
            target &&
            (target.tagName === "INPUT" ||
                target.tagName === "TEXTAREA" ||
                target.isContentEditable)
        ) {
            return;
        }

        var key = String(event.key || "").toLowerCase();
        if (key.length !== 1) {
            return;
        }

        qaSequence = (qaSequence + key).slice(-2);

        if (qaSequence === "qa") {
            setQaVisible(!qaVisible);
            qaSequence = "";
        }
    });
});

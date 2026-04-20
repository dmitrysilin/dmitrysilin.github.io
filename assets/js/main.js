document.addEventListener("DOMContentLoaded", function () {
    var LAST_UPDATED = "2026-04-20";
    var LAST_UPDATED_RU = LAST_UPDATED.split("-").reverse().join(".");
    var SITE_URL = "https://iloveqa.ru/";
    var API_URL = SITE_URL + "api/about_me.json";
    var API_ENDPOINT = "./api/about_me.json";

    var languageButtons = document.querySelectorAll("[data-lang-switch]");
    var main = document.querySelector(".page");
    var name = document.querySelector("[data-i18n='name']");
    var role = document.querySelector("[data-i18n='role']");
    var links = document.querySelector(".links");
    var telegramLink = document.querySelector("[data-i18n='telegram']");
    var emailLink = document.querySelector("[data-i18n='email']");
    var wishlistLink = document.querySelector("[data-i18n='wishlist']");
    var shareButton = document.querySelector("[data-share-page]");
    var stack = document.querySelector("[data-i18n='stack']");
    var apiBlock = document.querySelector("[data-api-block]");
    var apiLabel = document.querySelector("[data-i18n='api_label']");
    var copyButton = document.querySelector("[data-copy-curl]");
    var toggleButton = document.querySelector("[data-toggle-api]");
    var runButton = document.querySelector("[data-run-api]");
    var panel = document.querySelector("[data-api-panel]");
    var response = document.querySelector("[data-api-response]");
    var projectsBlock = document.querySelector("[data-projects-block]");
    var projectsLabel = document.querySelector("[data-i18n='projects_label']");
    var projectsToggleButton = document.querySelector("[data-toggle-projects]");
    var projectsPanel = document.querySelector("[data-projects-panel]");
    var projectOne = document.querySelector("[data-i18n='project_one']");
    var projectTwo = document.querySelector("[data-i18n='project_two']");
    var lastUpdated = document.querySelector("[data-i18n='last_updated']");
    var qaPanel = document.querySelector("[data-qa-panel]");
    var qaTitle = document.querySelector("[data-qa-title]");
    var qaBody = document.querySelector("[data-qa-body]");
    var structuredData = document.querySelector("#structured-data");
    var metaDescription = document.querySelector('meta[name="description"]');
    var ogLocale = document.querySelector('meta[property="og:locale"]');
    var ogSiteName = document.querySelector('meta[property="og:site_name"]');
    var ogTitle = document.querySelector('meta[property="og:title"]');
    var ogDescription = document.querySelector('meta[property="og:description"]');
    var command = "curl " + API_URL;
    var isExpanded = false;
    var projectsExpanded = false;
    var qaVisible = false;
    var qaSequence = "";
    var currentLang = "ru";
    var translations = {
        ru: {
            htmlLang: "ru",
            documentTitle: "Дмитрий Силин | QA-инженер",
            metaDescription: "Дмитрий Силин | QA-инженер",
            ogLocale: "ru_RU",
            ogSiteName: "Дмитрий Силин",
            ogTitle: "Дмитрий Силин — QA-инженер",
            ogDescription: "Дмитрий Силин | QA-инженер",
            pageLabel: "Личный сайт Дмитрия Силина",
            linksLabel: "Ссылки и действия",
            name: "Дмитрий Силин",
            role: "QA-инженер",
            telegram: "Телеграм",
            email: "Почта",
            wishlist: "Вишлист",
            share: {
                label: "Поделиться",
                done: "Готово",
                copied: "Скопировано",
                error: "Ошибка"
            },
            stack:
                "REST, gRPC, GraphQL, SOAP, Kafka, Redis, Oracle, PostgreSQL, Mockingbird, Postman, Insomnia, Swagger, SoapUI, DevTools, DBeaver, PL/SQL Developer, Kafka AKHQ, Kafka UI, Redpanda, Sage, Graylog, Grafana, ELK, Dynatrace, Openshift, Charles, Fiddler.",
            apiLabel: "GET /api/about_me.json",
            projectsLabel: "Проекты",
            projectOne: "Бот \"Потрачено\"",
            projectTwo: "Бот \"Что посмотреть\"",
            lastUpdated: "Обновлено " + LAST_UPDATED_RU,
            api: {
                copy: "Копировать",
                copied: "Скопировано",
                error: "Ошибка",
                expand: "Раскрыть",
                hide: "Скрыть",
                run: "Запустить",
                loading: "Загрузка",
                fetchError: "Не удалось получить /api/about_me.json"
            },
            easter: {
                title: "QA-режим",
                status: "статус",
                language: "язык",
                endpoint: "эндпоинт",
                runtime: "рантайм",
                updated: "обновлено",
                wish: "пожелание",
                hint: "подсказка",
                ready: "готов",
                hintValue: "введите qa, Esc чтобы закрыть",
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
            },
            structuredData: {
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Дмитрий Силин",
                jobTitle: "QA-инженер",
                url: SITE_URL,
                address: {
                    "@type": "PostalAddress",
                    addressLocality: "Ижевск",
                    addressCountry: "RU"
                },
                email: "mailto:qa.silin@ya.ru",
                sameAs: [
                    "https://t.me/iloveQA",
                    "https://buildin.ai/share/7a50c95d-e784-407c-985e-efef949e534b#8b2dbb4d-b0ec-4b53-918e-034baf79118b"
                ]
            }
        },
        en: {
            htmlLang: "en",
            documentTitle: "Dmitry Silin | QA engineer",
            metaDescription: "Dmitry Silin | QA engineer",
            ogLocale: "en_US",
            ogSiteName: "Dmitry Silin",
            ogTitle: "Dmitry Silin — QA engineer",
            ogDescription: "Dmitry Silin | QA engineer",
            pageLabel: "Personal website of Dmitry Silin",
            linksLabel: "Links and actions",
            name: "Dmitry Silin",
            role: "QA engineer",
            telegram: "Telegram",
            email: "Email",
            wishlist: "Wishlist",
            share: {
                label: "Share",
                done: "Shared",
                copied: "Copied",
                error: "Error"
            },
            stack:
                "REST, gRPC, GraphQL, SOAP, Kafka, Redis, Oracle, PostgreSQL, Mockingbird, Postman, Insomnia, Swagger, SoapUI, DevTools, DBeaver, PL/SQL Developer, Kafka AKHQ, Kafka UI, Redpanda, Sage, Graylog, Grafana, ELK, Dynatrace, Openshift, Charles, Fiddler.",
            apiLabel: "GET /api/about_me.json",
            projectsLabel: "Projects",
            projectOne: "Bot \"Потрачено\"",
            projectTwo: "Bot \"Что посмотреть\"",
            lastUpdated: "Updated " + LAST_UPDATED,
            api: {
                copy: "Copy",
                copied: "Copied",
                error: "Error",
                expand: "Expand",
                hide: "Hide",
                run: "Run",
                loading: "Loading",
                fetchError: "Unable to fetch /api/about_me.json"
            },
            easter: {
                title: "QA mode",
                status: "status",
                language: "language",
                endpoint: "endpoint",
                runtime: "runtime",
                updated: "updated",
                wish: "wish",
                hint: "hint",
                ready: "ready",
                hintValue: "type qa, press Esc to close",
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
            },
            structuredData: {
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Dmitry Silin",
                jobTitle: "QA engineer",
                url: SITE_URL,
                address: {
                    "@type": "PostalAddress",
                    addressLocality: "Izhevsk",
                    addressCountry: "RU"
                },
                email: "mailto:qa.silin@ya.ru",
                sameAs: [
                    "https://t.me/iloveQA",
                    "https://buildin.ai/share/7a50c95d-e784-407c-985e-efef949e534b#8b2dbb4d-b0ec-4b53-918e-034baf79118b"
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

    function getSavedLanguage() {
        try {
            var saved = window.localStorage.getItem("site-language");
            if (saved && translations[saved]) {
                return saved;
            }
        } catch (error) {}

        return detectBrowserLanguage();
    }

    function saveLanguage(lang) {
        try {
            window.localStorage.setItem("site-language", lang);
        } catch (error) {}
    }

    function updateLanguageButtons() {
        languageButtons.forEach(function (button) {
            var isActive = button.getAttribute("data-lang-switch") === currentLang;
            button.classList.toggle("is-active", isActive);
            button.setAttribute("aria-pressed", isActive ? "true" : "false");
        });
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
            text.updated + ": " + (currentLang === "ru" ? LAST_UPDATED_RU : LAST_UPDATED),
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

    function applyLanguage(lang) {
        var text = translations[lang];
        currentLang = lang;

        document.documentElement.lang = text.htmlLang;
        document.title = text.documentTitle;

        if (metaDescription) {
            metaDescription.setAttribute("content", text.metaDescription);
        }

        if (ogLocale) {
            ogLocale.setAttribute("content", text.ogLocale);
        }

        if (ogSiteName) {
            ogSiteName.setAttribute("content", text.ogSiteName);
        }

        if (ogTitle) {
            ogTitle.setAttribute("content", text.ogTitle);
        }

        if (ogDescription) {
            ogDescription.setAttribute("content", text.ogDescription);
        }

        if (structuredData) {
            structuredData.textContent = JSON.stringify(text.structuredData, null, 2);
        }

        if (main) {
            main.setAttribute("aria-label", text.pageLabel);
        }

        if (links) {
            links.setAttribute("aria-label", text.linksLabel);
        }

        if (name) {
            name.textContent = text.name;
        }

        if (role) {
            role.textContent = text.role;
        }

        if (telegramLink) {
            telegramLink.textContent = text.telegram;
        }

        if (emailLink) {
            emailLink.textContent = text.email;
        }

        if (wishlistLink) {
            wishlistLink.textContent = text.wishlist;
        }

        if (shareButton) {
            shareButton.textContent = text.share.label;
        }

        if (stack) {
            stack.textContent = text.stack;
        }

        if (apiLabel) {
            apiLabel.textContent = text.apiLabel;
        }

        if (projectsLabel) {
            projectsLabel.textContent = text.projectsLabel;
        }

        if (projectOne) {
            projectOne.textContent = text.projectOne;
        }

        if (projectTwo) {
            projectTwo.textContent = text.projectTwo;
        }

        if (lastUpdated) {
            lastUpdated.textContent = text.lastUpdated;
        }

        if (response && response.dataset.state === "error" && !response.hidden) {
            response.textContent = JSON.stringify(
                {
                    error: text.api.fetchError
                },
                null,
                2
            );
        }

        if (qaVisible) {
            renderQaPanel();
        }

        updateLanguageButtons();
        syncApiState();
        syncProjectsState();
        saveLanguage(lang);
    }

    function syncApiState() {
        if (!apiBlock || !copyButton || !toggleButton || !runButton || !panel) {
            return;
        }

        var text = translations[currentLang].api;
        apiBlock.dataset.expanded = isExpanded ? "true" : "false";
        copyButton.textContent = text.copy;
        toggleButton.textContent = isExpanded ? text.hide : text.expand;
        toggleButton.setAttribute("aria-expanded", isExpanded ? "true" : "false");
        runButton.hidden = !isExpanded;
        panel.hidden = !isExpanded;
        runButton.textContent = text.run;
    }

    function syncProjectsState() {
        if (!projectsBlock || !projectsToggleButton || !projectsPanel) {
            return;
        }

        var text = translations[currentLang].api;
        projectsBlock.dataset.expanded = projectsExpanded ? "true" : "false";
        projectsToggleButton.textContent = projectsExpanded ? text.hide : text.expand;
        projectsToggleButton.setAttribute("aria-expanded", projectsExpanded ? "true" : "false");
        projectsPanel.hidden = !projectsExpanded;
    }

    currentLang = getSavedLanguage();
    applyLanguage(currentLang);

    if (copyButton) {
        copyButton.addEventListener("click", async function () {
            var text = translations[currentLang].api;

            try {
                await navigator.clipboard.writeText(command);
                copyButton.textContent = text.copied;
            } catch (error) {
                copyButton.textContent = text.error;
            }

            setTimeout(function () {
                copyButton.textContent = translations[currentLang].api.copy;
            }, 1200);
        });
    }

    if (shareButton) {
        shareButton.addEventListener("click", async function () {
            var text = translations[currentLang].share;

            try {
                if (navigator.share) {
                    await navigator.share({
                        title: translations[currentLang].documentTitle,
                        text: translations[currentLang].metaDescription,
                        url: SITE_URL
                    });
                    shareButton.textContent = text.done;
                } else {
                    await navigator.clipboard.writeText(SITE_URL);
                    shareButton.textContent = text.copied;
                }
            } catch (error) {
                if (error && error.name === "AbortError") {
                    shareButton.textContent = text.label;
                    return;
                }

                shareButton.textContent = text.error;
            }

            setTimeout(function () {
                shareButton.textContent = translations[currentLang].share.label;
            }, 1200);
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

    if (toggleButton) {
        toggleButton.addEventListener("click", function () {
            isExpanded = !isExpanded;
            syncApiState();
        });
    }

    if (projectsToggleButton) {
        projectsToggleButton.addEventListener("click", function () {
            projectsExpanded = !projectsExpanded;
            syncProjectsState();
        });
    }

    if (runButton && response) {
        runButton.addEventListener("click", async function () {
            var text = translations[currentLang].api;
            runButton.disabled = true;
            runButton.textContent = text.loading;

            try {
                var result = await fetch(API_ENDPOINT, {
                    headers: {
                        Accept: "application/json"
                    }
                });

                if (!result.ok) {
                    throw new Error("Request failed");
                }

                var data = await result.json();
                response.hidden = false;
                response.dataset.state = "success";
                response.textContent = JSON.stringify(data, null, 2);
            } catch (error) {
                response.hidden = false;
                response.dataset.state = "error";
                response.textContent = JSON.stringify(
                    {
                        error: text.fetchError
                    },
                    null,
                    2
                );
            } finally {
                runButton.disabled = false;
                runButton.textContent = translations[currentLang].api.run;
            }
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

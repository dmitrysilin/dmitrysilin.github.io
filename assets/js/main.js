document.addEventListener("DOMContentLoaded", function () {
    var apiBlock = document.querySelector("[data-api-block]");
    var copyButton = document.querySelector("[data-copy-curl]");
    var toggleButton = document.querySelector("[data-toggle-api]");
    var runButton = document.querySelector("[data-run-api]");
    var panel = document.querySelector("[data-api-panel]");
    var response = document.querySelector("[data-api-response]");
    var command = "curl https://iloveqa.ru/api/about_me.json";
    var endpoint = "./api/about_me.json";
    var isExpanded = false;

    function syncApiState() {
        if (!apiBlock || !toggleButton || !runButton || !panel) {
            return;
        }

        apiBlock.dataset.expanded = isExpanded ? "true" : "false";
        toggleButton.textContent = isExpanded ? "Hide" : "Expand";
        toggleButton.setAttribute("aria-expanded", isExpanded ? "true" : "false");
        runButton.hidden = !isExpanded;
        panel.hidden = !isExpanded;
    }

    syncApiState();

    if (copyButton) {
        copyButton.addEventListener("click", async function () {
            try {
                await navigator.clipboard.writeText(command);
                copyButton.textContent = "Copied";
                setTimeout(function () {
                    copyButton.textContent = "Copy";
                }, 1200);
            } catch (error) {
                copyButton.textContent = "Error";
                setTimeout(function () {
                    copyButton.textContent = "Copy";
                }, 1200);
            }
        });
    }

    if (toggleButton) {
        toggleButton.addEventListener("click", function () {
            isExpanded = !isExpanded;
            syncApiState();
        });
    }

    if (runButton && response) {
        runButton.addEventListener("click", async function () {
            runButton.disabled = true;
            runButton.textContent = "Loading";

            try {
                var result = await fetch(endpoint, {
                    headers: {
                        Accept: "application/json"
                    }
                });

                if (!result.ok) {
                    throw new Error("Request failed");
                }

                var data = await result.json();
                response.hidden = false;
                response.textContent = JSON.stringify(data, null, 2);
            } catch (error) {
                response.hidden = false;
                response.textContent = JSON.stringify(
                    {
                        error: "Unable to fetch /api/about_me.json"
                    },
                    null,
                    2
                );
            } finally {
                runButton.disabled = false;
                runButton.textContent = "Run";
            }
        });
    }
});

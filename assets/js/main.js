document.addEventListener("DOMContentLoaded", function () {
    var copyButton = document.querySelector("[data-copy-curl]");
    var runButton = document.querySelector("[data-run-api]");
    var response = document.querySelector("[data-api-response]");
    var command = "curl https://iloveqa.ru/api/about_me.json";
    var endpoint = "./api/about_me.json";

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
                runButton.textContent = "Loaded";
            } catch (error) {
                response.hidden = false;
                response.textContent = JSON.stringify(
                    {
                        error: "Unable to fetch /api/about_me.json"
                    },
                    null,
                    2
                );
                runButton.textContent = "Retry";
            } finally {
                runButton.disabled = false;
            }
        });
    }
});

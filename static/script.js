async function generateSummary() {

    const notes =
        document.getElementById("notes").value;

    const fileInput =
        document.getElementById("fileInput");

    const resultDiv =
        document.getElementById("result");

    const loading =
        document.getElementById("loading");

    loading.classList.remove("hidden");

    resultDiv.innerHTML = "";

    const formData = new FormData();

    // FILE
    if (fileInput.files.length > 0) {

        formData.append(
            "file",
            fileInput.files[0]
        );
    }

    // NOTES
    formData.append(
        "notes",
        notes
    );

    try {

        const response = await fetch(
            "/summarize",
            {
                method: "POST",
                body: formData
            }
        );

        const data = await response.json();

        loading.classList.add("hidden");

        resultDiv.innerHTML = `

            <div class="summary-card">

                <h2>
                    AI Generated Summary
                </h2>

                <div class="summary-text">
                    ${data.summary}
                </div>

            </div>

        `;

    } catch (error) {

        loading.classList.add("hidden");

        resultDiv.innerHTML = `

            <div class="error">

                Error generating summary.

            </div>

        `;
    }
}
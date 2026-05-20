async function generateSummary() {

    const notes = document.getElementById("notes").value;
    const fileInput = document.getElementById("fileInput");

    const resultDiv = document.getElementById("result");
    const loading = document.getElementById("loading");

    loading.classList.remove("hidden");

    resultDiv.innerHTML = "";

    const formData = new FormData();

    if (fileInput.files.length > 0) {
        formData.append("file", fileInput.files[0]);
    }

    if (notes.trim() !== "") {
        formData.append("notes", notes);
    }

    try {

        const response = await fetch("/summarize", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        loading.classList.add("hidden");

        resultDiv.innerHTML = data.summary;

    } catch (error) {

        loading.classList.add("hidden");

        resultDiv.innerHTML = "Error generating summary.";
    }
}
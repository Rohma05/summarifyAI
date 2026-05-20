const fileInput = document.getElementById("fileInput");

const output = document.getElementById("output");

fileInput.addEventListener("change", () => {

    if(fileInput.files.length > 0){

        const file = fileInput.files[0];

        document.querySelector(".upload-content span").innerHTML =
            `Selected: ${file.name}`;

    }

});

async function generateSummary(){

    const notes = document.getElementById("notes").value;

    const file = fileInput.files[0];

    const formData = new FormData();

    formData.append("notes", notes);

    if(file){
        formData.append("file", file);
    }

    output.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>AI is generating summary...</p>
        </div>
    `;

    try{

        const response = await fetch("/summarize", {

            method:"POST",

            body:formData

        });

        const data = await response.json();

        typeWriterEffect(data.summary);

    }

    catch(error){

        output.innerHTML = `
            <span style="color:red;">
                Error generating summary.
            </span>
        `;

    }

}

function typeWriterEffect(text){

    output.innerHTML = "";

    let i = 0;

    function typing(){

        if(i < text.length){

            output.innerHTML += text.charAt(i);

            i++;

            setTimeout(typing, 12);

        }

    }

    typing();

}
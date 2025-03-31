let mediaRecorder;
let audioChunks = [];

document.getElementById("start").addEventListener("click", async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = event => audioChunks.push(event.data);
    mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(audioBlob);
        const audioElement = document.getElementById("audio");
        audioElement.src = audioUrl;

        const downloadLink = document.getElementById("download");
        downloadLink.href = audioUrl;
        downloadLink.download = "recording.wav";
        downloadLink.style.display = "block";
        downloadLink.textContent = "Download Recording";
    };

    mediaRecorder.start();
    document.getElementById("start").disabled = true;
    document.getElementById("stop").disabled = false;
    audioChunks = [];
});

document.getElementById("stop").addEventListener("click", () => {
    mediaRecorder.stop();
    document.getElementById("start").disabled = false;
    document.getElementById("stop").disabled = true;
});

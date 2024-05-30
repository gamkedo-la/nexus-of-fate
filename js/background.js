var background = {
    draw : function() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#deb887"; 
        context.fillRect(0, canvas.height * 0.85, canvas.width, canvas.height * 0.7);
        context.fillStyle = "darkblue"; 
        context.fillRect(0, 0, canvas.width, canvas.height * 0.3); 
        context.beginPath();
        context.arc(canvas.width * 0.8, canvas.height * 0.2, 50, 0, 2 * Math.PI); 
        context.fillStyle = "white"; 
        context.fill();
        context.closePath();
    }
}


const uploadPhoto = async (blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = async () => {
      const base64Data = reader.result.split(",")[1]; // Extract base64 data
      
      const response = await fetch("https://script.google.com/macros/s/AKfycbwtoK9GE6EOrjXHJkxfSD-QdbIGlDOS4cASJccGQqcM6496usYZ5xdoq8JX3nKm18Ge5Q/exec", { // Replace with your Apps Script URL
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ image: base64Data }),
      });
  
      const data = await response.json();
      setPhoto(data.url);
    };
  };
  
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    console.log("Status:", xhr.status);
    console.log("Raw Response Text:", xhr.responseText); // 👈 Add this

    if (xhr.status === 200 || xhr.status === 0) {
      try {
        var config = JSON.parse(xhr.responseText);
        var videoUrl = config.url;
        console.log("✅ Video URL:", videoUrl);
      } catch (e) {
        console.error("❌ JSON parse error:", e.message);
        console.log("📛 Raw data that failed to parse:", xhr.responseText);
      }
    } else {
      console.error("❌ Bad HTTP status:", xhr.status);
    }
  }
};

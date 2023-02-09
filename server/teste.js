async function imageToDataURL(imageUrl) {
    let img = await fetch(imageUrl);
    img = await img.blob();
    let bitmap = await createImageBitmap(img);
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    ctx.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height);
    return canvas.toDataURL("image/png");
    // image compression? 
    // return canvas.toDataURL("image/png", 0.9);
  };
  
  (async() => {
    let dataUrl = await imageToDataURL('https://en.wikipedia.org/static/images/project-logos/enwiki.png')
    wikiImg.src = dataUrl;
    console.log(dataUrl)
  })();

  imageToDataURL("https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/211813846/original/d063f746b5e4a9c4b505118b991b6e30f79523e4/design-a-professional-spotify-artist-banner.jpg")
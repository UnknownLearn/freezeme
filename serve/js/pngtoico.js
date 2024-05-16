const imageInput = document.getElementById('imageInput');
const convertButton = document.getElementById('convertButton');
const downloadLink = document.getElementById('downloadLink');

function showImage() {
  const imageInput = document.getElementById('imageInput');
  const previewImage = document.getElementById('previewImage');

  if (!imageInput.files || !imageInput.files[0]) {
    return;
  }

  if (!imageInput.files[0].type.startsWith('image/png')) {
    alert('Please select a PNG image.');
    return;
  }

  const reader = new FileReader();
  reader.onload = (event) => {
    previewImage.src = event.target.result;
    previewImage.style.display = 'block';
  };
  reader.readAsDataURL(imageInput.files[0]);
}

convertButton.addEventListener('click', () => {
  const file = imageInput.files[0];
  if (!file || !file.type.startsWith('image/png')) {
    alert('Please select a PNG image.');
    return;
  }
  const reader = new FileReader();
  reader.onload = (event) => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext('2d');
      context.fillStyle = 'white';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0);
      const dataUrl = canvas.toDataURL('image/ico');
      downloadLink.href = dataUrl;
      downloadLink.download = 'converted.ico';
      downloadLink.click();
    };
    image.src = event.target.result;
  };
  reader.readAsDataURL(file);
});

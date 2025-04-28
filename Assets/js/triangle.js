function drawTriangle() {
  const a = parseFloat(document.getElementById('a').value);
  const b = parseFloat(document.getElementById('b').value);
  const gamma = parseFloat(document.getElementById('gamma').value);

  const result = document.getElementById('result');
  const canvas = document.getElementById('triangleCanvas');
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (isNaN(a) || isNaN(b) || isNaN(gamma) || a <= 0 || b <= 0 || gamma <= 0 || gamma >= 180) {
    result.textContent = 'Hibás bemenet! Ellenőrizd az értékeket.';
    return;
  }

  const gammaRad = gamma * Math.PI / 180;
  const c = Math.sqrt(a*a + b*b - 2*a*b*Math.cos(gammaRad));

  if (isNaN(c) || c <= 0) {
    result.textContent = 'Nem lehet háromszöget létrehozni ezekből az adatokból.';
    return;
  }

  result.textContent = `Kiszámolt oldal c: ${c.toFixed(2)} cm`;

  const margin = 20;
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const maxLength = Math.max(a, b, c);
  const scale = (canvasWidth - 2 * margin) / (a + b); // kisebb skála, hogy biztos beleférjen

  const ax = canvasWidth / 2 - (a * scale) / 2;
  const ay = canvasHeight / 2 + b * scale * Math.sin(gammaRad) / 2;
  const bx = ax + a * scale;
  const by = ay;
  const cx = ax + b * scale * Math.cos(gammaRad);
  const cy = ay - b * scale * Math.sin(gammaRad);

  ctx.beginPath();
  ctx.moveTo(ax, ay);
  ctx.lineTo(bx, by);
  ctx.lineTo(cx, cy);
  ctx.closePath();
  ctx.strokeStyle = '#0074D9';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = 'rgba(0, 116, 217, 0.2)';
  ctx.fill();

  ctx.fillStyle = '#000';
  ctx.font = "16px Arial";
  ctx.fillText("A", ax - 10, ay + 15);
  ctx.fillText("B", bx + 5, by + 15);
  ctx.fillText("C", cx, cy - 10);

  const midABx = (ax + bx) / 2;
  const midABy = (ay + by) / 2;
  const midBCx = (bx + cx) / 2;
  const midBCy = (by + cy) / 2;
  const midCAx = (cx + ax) / 2;
  const midCAy = (cy + ay) / 2;

  ctx.fillStyle = '#d00';
  ctx.fillText("c", midABx, midABy - 5);
  ctx.fillText("a", midBCx + 5, midBCy);
  ctx.fillText("b", midCAx - 15, midCAy);
}

function generateRandomTriangle() {
  const a = Math.floor(Math.random() * 20 + 5);
  const b = Math.floor(Math.random() * 20 + 5);
  const gamma = Math.floor(Math.random() * 100 + 30);
  document.getElementById('a').value = a;
  document.getElementById('b').value = b;
  document.getElementById('gamma').value = gamma;
  drawTriangle();
}
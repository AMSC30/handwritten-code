class Clock {
  constructor(className) {
    this.ctx = null;
    this.init(className);
  }
  init(className) {
    this.getCtx(className);
    this.createBorder();
  }
  getCtx(className) {
    const canvas = document.querySelector(className);
    this.ctx = canvas.getContext("2d");
    this.ctx.translate(300, 300);
    this.ctx.save();
  }
  createBorder(strokeStyle = "grey") {
    this.ctx.arc(0, 0, 250, 0, 2 * Math.PI);
    this.ctx.strokeStyle = strokeStyle;
    this.ctx.lineWidth = 20;
    this.ctx.stroke();
  }
}

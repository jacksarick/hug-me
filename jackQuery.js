function Tag(x) {
  if (x[0] == "#") {
    this.$ = document.getElementById(x.slice(1));
  }
  if (x[0] == ".") {
    this.$ = document.getElementsByClassName(x.slice(1))[0];
  }

  this.style = function(a, v) { this.$.style[a] = v; }
  this.append = function(c) { this.$.innerHTML += c; }
  this.show = function(s) { this.$.style.display = "block"; }
  this.hide = function(s) { this.$.style.display = "none"; }
  this.listen = function(a, f) { this.$.addEventListener(a, f, false); }

  this.html = function(v) {
    if (v != undefined){
      this.$.innerHTML = v;
    }

    else {
      return this.$.innerHTML;
    }
  }

  this.value = function(v) {
    if (v != undefined){
      this.$.value = v;
    }

    else {
      return this.$.value;
    }
  }
}

$ = function(name) { return new Tag(name); }

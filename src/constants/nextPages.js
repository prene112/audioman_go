var nextPages = {};
for (var i = 2; i < 22; i++) {
    nextPages["/page".concat(i.toString())] = "/page".concat((i+1).toString());
}

export default nextPages;
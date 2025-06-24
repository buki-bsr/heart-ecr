e = [];
h = [];
var dpr = window.devicePixelRatio || 1;

c.width = window.innerWidth * dpr;
c.height = window.innerHeight * dpr;
c.style.width = window.innerWidth + 'px';
c.style.height = window.innerHeight + 'px';

a.scale(dpr, dpr);

var O = window.innerWidth;
var Q = window.innerHeight;

v = 32;
M = Math;
R = M.random;
C = M.cos;
Y = 6.3;

for (i = 0; i < Y; i += 0.2) {
    h.push([
        O / 2 + 280 * M.pow(M.sin(i), 3),    // 180 → 280 (büyüttüm)
        Q / 2 + 20 * (-(15 * C(i) - 5 * C(2 * i) - 2 * C(3 * i) - C(4 * i))) // 10 → 20 (büyüttüm)
    ]);
}

i = 0;
while (i < v) {

    x = R() * O;
    y = R() * Q;

    H = i / v * 80 + 280;
    S = R() * 40 + 60;
    B = R() * 60 + 20;

    f = [];

    k = 0;
    while (k < v) {
        f[k++] = {
            x: x,
            y: y,
            X: 0,
            Y: 0,
            R: (1 - k / v) + 1,
            S: R() + 1,
            q: ~~(R() * v),
            D: i % 2 * 2 - 1,
            F: R() * 0.2 + 0.7,
            f: "hsla(" + ~~H + "," + ~~S + "%," + ~~B + "%,.5)"
        };
    }

    e[i++] = f;
}

function render(_) {
    a.fillStyle = _.f;
    a.beginPath();
    a.arc(_.x, _.y, _.R, 0, Y, 1);
    a.closePath();
    a.fill();
}

function loop() {
    a.fillStyle = "rgba(0,0,0,.2)";
    a.fillRect(0, 0, O, Q);

    i = v;
    while (i--) {

        f = e[i];
        u = f[0];
        q = h[u.q];
        D = u.x - q[0];
        E = u.y - q[1];
        G = M.sqrt((D * D) + (E * E));

        if (G < 10) {
            if (R() > .95) {
                u.q = ~~(R() * v);
            } else {
                if (R() > .99) u.D *= -1;
                u.q += u.D;
                u.q %= v;
                if (u.q < 0) u.q += v;
            }
        }

        u.X += -D / G * u.S;
        u.Y += -E / G * u.S;

        u.x += u.X;
        u.y += u.Y;

        render(u);

        u.X *= u.F;
        u.Y *= u.F;

        k = 0;
        while (k < v - 1) {
            T = f[k];
            N = f[++k];

            N.x -= (N.x - T.x) * .7;
            N.y -= (N.y - T.y) * .7;

            render(N);

        }

    }

    // Yazıyı kalbin ortasına çiz (font büyütüldü)
    a.fillStyle = "rgba(231, 12, 158, 0.7)";
    a.font = "130px Gwendolyn";
    a.textAlign = "center";
    a.fillText("Yağmur", O / 2, Q / 2 + 15);
}

(function doit() {
    requestAnimationFrame(doit);
    loop();
}());

window.addEventListener('resize', function () {
    var dpr = window.devicePixelRatio || 1;

    c.width = window.innerWidth * dpr;
    c.height = window.innerHeight * dpr;
    c.style.width = window.innerWidth + 'px';
    c.style.height = window.innerHeight + 'px';

    a.scale(dpr, dpr);

    O = window.innerWidth;
    Q = window.innerHeight;

    // Kalp yolunu yeniden oluştur
    h = [];
    for (let i = 0; i < Y; i += 0.2) {
        h.push([
            O / 2 + 280 * M.pow(M.sin(i), 3),
            Q / 2 + 20 * (-(15 * C(i) - 5 * C(2 * i) - 2 * C(3 * i) - C(4 * i)))
        ]);
    }
});

window.addEventListener('wheel', function (e) {
    if (e.ctrlKey) {
        e.preventDefault();
    }
}, { passive: false });

document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
});

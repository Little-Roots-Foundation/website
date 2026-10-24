// Klaviyo client subscription. Uses the public company ID only; no private key on this site.
(function () {
  var COMPANY = "X96FWU";
  var LIST = "Yxt8Ly";
  var RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  document.querySelectorAll("form.lr-signup").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = form.querySelector("input[type=email]");
      var msg = form.querySelector(".msg");
      var btn = form.querySelector("button");
      var email = (input.value || "").trim();
      msg.className = "msg";
      if (!RE.test(email)) { msg.textContent = "Please enter a valid email address."; msg.classList.add("err"); input.focus(); return; }
      btn.disabled = true;
      var body = { data: { type: "subscription", attributes: {
        custom_source: "littlerootsfoundation.org " + form.dataset.source,
        profile: { data: { type: "profile", attributes: { email: email, properties: { lrf_signup_source: form.dataset.source } } } }
      }, relationships: { list: { data: { type: "list", id: LIST } } } } };
      fetch("https://a.klaviyo.com/client/subscriptions?company_id=" + COMPANY, {
        method: "POST",
        headers: { "Content-Type": "application/vnd.api+json", "revision": "2024-10-15" },
        body: JSON.stringify(body)
      }).then(function (r) {
        if (!r.ok) throw new Error(r.status);
        msg.textContent = form.dataset.success; msg.classList.add("ok"); input.value = "";
        var dl = document.getElementById("downloads"); if (dl && form.dataset.source === "free-cards") dl.hidden = false;
      }).catch(function () {
        msg.textContent = "Something went wrong. Please try again in a moment."; msg.classList.add("err");
      }).then(function () { btn.disabled = false; });
    });
  });
})();

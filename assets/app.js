/* SAVE Plan Exit Checklist (Grad-IQ). Every rule here was checked against StudentAid.gov, ED.gov or a federal
   servicer site on StudentAid.gov on Oct 28, 2026 (see Sources). Items we could not confirm are labeled "Reported". */
(function () {
  "use strict";
  var H = window.PH;
  var L = {
    save: "https://studentaid.gov/articles/save/",
    court: "https://studentaid.gov/courtactions",
    calc: "https://studentaid.gov/articles/repayment-calculator/",
    calcTool: "https://studentaid.gov/repayment-calculator",
    idr: "https://studentaid.gov/idr",
    idrFaq: "https://studentaid.gov/articles/faqs-idr-plan/",
    servicers: "https://studentaid.gov/manage-loans/repayment/servicers",
    sa: "https://studentaid.gov/",
    edNext: "https://www.ed.gov/about/news/press-release/us-department-of-education-announces-next-steps-borrowers-enrolled-unlawful-save-plan",
    edInterest: "https://www.ed.gov/about/news/press-release/us-department-of-education-continues-improve-federal-student-loan-repayment-options-addresses-illegal-biden-administration-actions",
    edfin: "https://edfinancial.studentaid.gov/faqs",
    mohelaSave: "https://mohela.studentaid.gov/DL/resourceCenter/SAVEPlanFaq.aspx",
    mohelaPslf: "https://mohela.studentaid.gov/DL/resourceCenter/PSLFInformation.aspx",
    pslf: "https://studentaid.gov/pslf",
    buyback: "https://studentaid.gov/pslfbuyback",
    cfpb: "https://www.consumerfinance.gov/complaint/",
    forbes: "https://www.forbes.com/sites/adamminsky/2026/10/28/final-deadline-for-student-loans-hits-some-borrowers-this-week-but-dont-panic/"
  };
  function a(u, t) { return '<a href="' + u + '" target="_blank" rel="noopener">' + t + "</a>"; }
  var SERVICERS = [["", "Choose…"], ["Aidvantage", "Aidvantage"], ["CRI", "CRI"], ["Edfinancial", "Edfinancial"], ["MOHELA", "MOHELA"], ["Nelnet", "Nelnet"], ["Other", "Other / not sure"]];
  var SENDER = {
    Aidvantage: "customerservice@aidvantage.studentaid.gov",
    CRI: "CRINoReply@cri.studentaid.gov",
    Edfinancial: "donotreply@mail.edfinancial.studentaid.gov or info@email.edfinancial.studentaid.gov",
    MOHELA: "noreply@mohela.studentaid.gov",
    Nelnet: "nelnetnoreply@nelnet.studentaid.gov"
  };
  var PLANS = [
    ["rap", "Repayment Assistance Plan (RAP)", "IDR", "1–10% of AGI ÷ 12, minus $50 per dependent; at least $10/month", "30 years", "Direct Loans disbursed any time"],
    ["ibr", "Income-Based Repayment (IBR)", "IDR", "15% of discretionary income (10% for new borrowers), capped at the 10-year Standard amount", "25 years (20 for new borrowers)", "Direct and FFEL loans disbursed before July 1, 2026"],
    ["paye", "Pay As You Earn (PAYE)", "IDR", "10% of discretionary income; must be less than 10-year Standard", "20 years", "Direct Loans before July 1, 2026 · plan ends no later than July 1, 2028"],
    ["icr", "Income-Contingent Repayment (ICR)", "IDR", "Lesser of 20% of discretionary income or a 12-year fixed payment adjusted for income", "25 years", "Direct Loans before July 1, 2026 · plan ends no later than July 1, 2028"],
    ["std", "Standard", "Fixed", "Fixed", "10 years (10–30 for Consolidation Loans)", "Loans disbursed before July 1, 2026"],
    ["grad", "Graduated", "Fixed", "Starts lower, usually rises every two years", "10 years (10–30 for Consolidation Loans)", "Loans disbursed before July 1, 2026"],
    ["ext", "Extended", "Fixed", "Fixed or graduated", "25 years", "Loans disbursed before July 1, 2026"],
    ["tier", "Tiered Standard", "Fixed", "Fixed", "10–25 years by balance", "The only fixed plan for loans disbursed on/after July 1, 2026 · does not count for PSLF"]
  ];
  var STEPS = [
    { id: "deadline", n: 1, label: "1 · Deadline", checks: [["d1", "Found my servicer's SAVE notice (servicer inbox or email)"], ["d2", "Wrote down the notice date and the deadline printed on it"], ["d3", "Checked whether I also got a \"Final Notice\" (30 days)"], ["d4", "Deadline is in my phone calendar"]] },
    { id: "login", n: 2, label: "2 · Log in", checks: [["l1", "Logged in to StudentAid.gov with my FSA ID", L.sa, "StudentAid.gov"], ["l2", "Confirmed my current repayment plan shows SAVE (or a pending SAVE application)"], ["l3", "Found my servicer and logged in to its site", L.servicers, "Find my servicer"], ["l4", "Updated my email, phone and mailing address in both places"], ["l5", "Listed my loan types and first disbursement dates (Dashboard)"]] },
    { id: "compare", n: 3, label: "3 · Compare", checks: [["c1", "Opened the Repayment Calculator (formerly Loan Simulator) while logged in", L.calcTool, "Repayment Calculator"], ["c2", "Allowed the IRS income import, or entered my income manually"], ["c3", "Wrote each eligible plan's estimates in the table below"], ["c4", "Turned \"PSLF On\" too, if I work in public service"], ["c5", "Picked the plan I'm applying for (my own decision)"]] },
    { id: "docs", n: 4, label: "4 · Income docs", checks: [["i1", "Decided: IRS consent (Direct Loans) or manual upload"], ["i2", "Have my most recent federal tax return"], ["i3", "Didn't file? Have recent pay stubs or an employer letter"], ["i4", "Know my family size and spouse's info if married"], ["i5", "Saved copies of everything I upload"]] },
    { id: "apply", n: 5, label: "5 · Apply", checks: [["a1", "Submitted the IDR application at StudentAid.gov/idr (or applied for a fixed plan)", L.idr, "IDR application"], ["a2", "Saved the submission confirmation screen or email"], ["a3", "Checked status on StudentAid.gov \"My Activity\""], ["a4", "Handled any \"Action Required\" items"]] },
    { id: "confirm", n: 6, label: "6 · Confirmations", checks: [["n1", "Logged every confirmation number below"], ["n2", "Got written confirmation of my new plan from my servicer"]] },
    { id: "bill", n: 7, label: "7 · First bill", checks: [["b1", "Got my new payment amount notice (servicers send it at least 21 days before the first due date)"], ["b2", "Compared the bill with my Repayment Calculator estimate"], ["b3", "Checked my autopay amount and date"], ["b4", "Called about any difference and logged the call"]] },
    { id: "remind", n: 8, label: "8 · Reminders", checks: [["r1", "Added my reminders to my calendar"], ["r2", "Know my yearly IDR recertification date"]] },
    { id: "forb", n: 9, label: "9 · Forbearance", checks: [["f1", "Know whether my loans are in forbearance right now, and which kind"], ["f2", "Read the tradeoffs below before asking for more forbearance"]] },
    { id: "pslf", n: 10, label: "10 · PSLF", checks: [["p1", "Checked my PSLF payment count on StudentAid.gov", L.pslf, "PSLF Help Tool"], ["p2", "Read the PSLF notes below"]] }
  ];
  function plans() { return PLANS.map(function (p) { return { id: p[0], elig: "", monthly: "", total: "", end: "", note: "" }; }); }
  function conf() { return { id: H.uid(), date: "", servicer: "", rep: "", channel: "phone", num: "", what: "" }; }
  function call() { return { id: H.uid(), date: "", time: "", servicer: "", rep: "", phone: "", mins: "", summary: "", followUp: "" }; }
  function rem() { return { id: H.uid(), title: "", date: "", note: "" }; }
  function defaults() {
    return {
      dl: { servicer: "", type: "90", noticeDate: "", finalDate: "", printed: "", notes: "" },
      login: { newLoan: "", pending: "", fsa: "", acct: "" },
      plans: plans(),
      choice: { plan: "", why: "" },
      docs: { method: "", taxYear: "", family: "", notes: "" },
      apply: { submitted: "", how: "online", plan: "", status: "", confNum: "", checkEvery: "7" },
      confs: [],
      bill: { estimate: "", amount: "", noticeDate: "", firstDue: "", autopay: "", notes: "" },
      rems: [],
      remOpts: { deadline: true, weekBefore: true, firstDue: true, status: true, autopay: true, recert: "" },
      forb: { inForb: "", type: "", ends: "", notes: "" },
      pslf: { employer: "", count: "", saveMonths: "", lastForm: "", notes: "" },
      calls: [],
      checks: {}
    };
  }
  function off(n) { var d = new Date(); d.setDate(d.getDate() + n); return iso(d); }
  function demo() {
    var p = plans();
    var est = { rap: ["yes", "118", "52,400", "2049", "Sample numbers"], ibr: ["yes", "164", "47,900", "2045", "Sample"], paye: ["yes", "109", "41,200", "2045", "Plan ends by July 1, 2028"], icr: ["yes", "251", "44,800", "2049", ""], std: ["yes", "392", "38,600", "2036", "Auto-placement plan if I do nothing"], grad: ["yes", "221", "41,700", "2036", ""], ext: ["no", "", "", "", "Balance too low (sample)"], tier: ["no", "", "", "", "No loans after July 1, 2026"] };
    p.forEach(function (x) { var e = est[x.id]; x.elig = e[0]; x.monthly = e[1]; x.total = e[2]; x.end = e[3]; x.note = e[4]; });
    return {
      dl: { servicer: "MOHELA", type: "final30", noticeDate: off(-118), finalDate: off(-26), printed: "", notes: "Final Notice email found by searching the subject line (sample)" },
      login: { newLoan: "no", pending: "no", fsa: "FSA ID saved in password manager (sample)", acct: "Acct ending 1234 (sample)" },
      plans: p,
      choice: { plan: "My choice goes here (sample)", why: "Notes on why I picked it, in my own words (sample)" },
      docs: { method: "irs", taxYear: "2025", family: "1", notes: "Stipend + summer RA (sample)" },
      apply: { submitted: off(-3), how: "online", plan: "Chosen IDR plan (sample)", status: "inreview", confNum: "SA-2026-000000 (sample)", checkEvery: "7" },
      confs: [{ id: "c1", date: off(-3), servicer: "StudentAid.gov", rep: "Online", channel: "online", num: "SA-2026-000000 (sample)", what: "IDR application submitted" }, { id: "c2", date: off(-1), servicer: "MOHELA", rep: "Rep \"Dana\", ID 4471 (sample)", channel: "phone", num: "CALL-88213 (sample)", what: "Confirmed application received; asked about processing forbearance" }],
      bill: { estimate: "118", amount: "", noticeDate: "", firstDue: off(40), autopay: "yes", notes: "" },
      rems: [{ id: "r1", title: "Upload pay stub if asked (sample)", date: off(5), note: "" }],
      remOpts: { deadline: true, weekBefore: true, firstDue: true, status: true, autopay: true, recert: off(340) },
      forb: { inForb: "yes", type: "SAVE forbearance (sample)", ends: "", notes: "Ask servicer what status applies while my application is processed (sample)" },
      pslf: { employer: "University (public) (sample)", count: "38", saveMonths: "14", lastForm: "2026-01-15", notes: "" },
      calls: [{ id: "k1", date: off(-1), time: "10:20", servicer: "MOHELA", rep: "Dana, ID 4471 (sample)", phone: "Servicer number (sample)", mins: "42", summary: "Application received; no payment due until new plan notice (sample)", followUp: off(13) }],
      checks: { d1: true, d2: true, d3: true, d4: true, l1: true, l2: true, l3: true, l4: true, l5: true, c1: true, c2: true, c3: true, c5: true, i1: true, i2: true, i4: true, i5: true, a1: true, a2: true, n1: true, b3: true }
    };
  }
  function iso(d) { return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  function addDays(isoS, n) { var d = new Date(isoS + "T00:00:00"); d.setDate(d.getDate() + n); return iso(d); }
  function fmt(isoS) { return isoS ? new Date(isoS + "T00:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" }) : "—"; }
  function daysTo(isoS) { var d = new Date(isoS + "T00:00:00"), n = new Date(); n.setHours(0, 0, 0, 0); return Math.round((d - n) / 864e5); }
  function deadline(s) {
    var d = s.dl;
    if (d.printed) return { date: d.printed, how: "the deadline printed on your notice" };
    if (d.type === "final30" && d.finalDate) return { date: addDays(d.finalDate, 30), how: "your final-notice date + 30 days" };
    if (d.noticeDate) return { date: addDays(d.noticeDate, 90), how: "your notice date + 90 days" };
    return null;
  }
  function stepDone(s, st) { return st.checks.filter(function (c) { return s.checks[c[0]]; }).length; }
  function checklist(s, st) {
    return '<div class="card soft"><div class="card-head"><h2>Step ' + st.n + " checklist</h2>" + H.out("sp-" + st.id, "pill lav") + "</div>" + st.checks.map(function (c) { return '<div class="ck-row" style="grid-template-columns:26px 1fr"><input type="checkbox" data-path="checks.' + c[0] + '"' + (s.checks[c[0]] ? " checked" : "") + ' id="ck-' + c[0] + '"><label for="ck-' + c[0] + '">' + c[1] + (c[2] ? " · " + a(c[2], c[3]) : "") + "</label></div>"; }).join("") + "</div>";
  }
  function stepOf(id) { return STEPS.filter(function (x) { return x.id === id; })[0]; }
  function reported(t) { return '<div class="notice"><p><span class="pill warn">Reported, not confirmed</span> ' + t + "</p></div>"; }
  function reminders(s) {
    var out = [], dl = deadline(s), o = s.remOpts;
    if (dl && o.deadline) out.push({ title: "SAVE exit deadline: choose a repayment plan", date: dl.date, note: "From " + dl.how + ". Check your servicer notice." });
    if (dl && o.weekBefore) out.push({ title: "One week to my SAVE exit deadline", date: addDays(dl.date, -7), note: "" });
    if (s.apply.submitted && o.status) { var n = Math.max(1, H.num(s.apply.checkEvery) || 7); out.push({ title: "Check my repayment plan application status (My Activity)", date: addDays(s.apply.submitted, n), note: "Then every " + n + " days until it's processed" }); }
    if (s.bill.firstDue && o.firstDue) { out.push({ title: "First payment due on my new plan", date: s.bill.firstDue, note: "Compare with my estimate" }); out.push({ title: "Check first bill before it's due", date: addDays(s.bill.firstDue, -7), note: "" }); }
    if (o.autopay) out.push({ title: "Autopay 1% rate-reduction enrollment cutoff", date: "2026-12-31", note: "Eligible borrowers enrolled by Dec 31, 2026 get 1% off through June 30, 2028 (StudentAid.gov)" });
    if (o.recert) out.push({ title: "Recertify my income-driven plan", date: o.recert, note: "IDR plans renew yearly" });
    s.rems.forEach(function (r) { if (r.date) out.push({ title: r.title || "Student loan reminder", date: r.date, note: r.note }); });
    return out.sort(function (x, y) { return x.date < y.date ? -1 : 1; });
  }

  var sections = [
    { id: "deadline", label: "1 · Deadline", render: function (s) {
      return '<div class="card"><p class="eyebrow">Step 1 · Find your notice</p><h2>Your SAVE exit deadline</h2><p class="small">Your deadline comes from your <strong>servicer\'s</strong> notice, not from an email from Federal Student Aid. Servicers send notices in groups, so people with the same servicer can have different deadlines.</p>' +
        '<div class="field-row">' + H.input("dl.servicer", "My loan servicer", "select", { options: SERVICERS }) + H.input("dl.type", "Latest notice I got", "select", { options: [["90", "\"You Have 90 Days to Select a New Repayment Plan\""], ["final30", "\"Final Notice – …in 30 Days\""], ["denial", "SAVE application denied (90 days)"]] }) + "</div>" +
        '<div class="field-row">' + H.input("dl.noticeDate", "Date of the 90-day notice", "date") + H.input("dl.finalDate", "Date of the final 30-day notice", "date", { hint: "(if you got one)" }) + H.input("dl.printed", "Deadline printed on my notice", "date", { hint: "(overrides the math)" }) + "</div>" +
        '<div class="countdown">' + H.out("dlBox") + "</div>" + H.out("senderBox") +
        '<div class="field-row">' + H.input("dl.notes", "Where I found it / notes") + "</div></div>" +
        '<div class="card sky"><h2>90-day vs 30-day notices</h2><p>They aren\'t conflicting rules. They are two notices in a row:</p><ol class="small"><li><strong>First notice:</strong> 90 days to choose a plan. Example from StudentAid.gov: a July 1, 2026 notice meant a Sept 29, 2026 deadline.</li><li><strong>Final notice:</strong> if you don\'t act in those 90 days, your servicer sends a final 30-day notice.</li><li><strong>After the final deadline:</strong> you\'re placed in the Standard plan, or Tiered Standard if you have a loan disbursed on or after July 1, 2026 that has entered repayment. If you had only a <em>pending</em> SAVE application, you go back to the plan you were on before.</li></ol><p class="small">Search your email for the subject lines above, or check your servicer\'s website inbox. ' + a(L.save, "StudentAid.gov SAVE FAQ") + "</p></div>" +
        reported("News coverage says the first group's <strong>final</strong> deadline falls on <strong>Oct 29, 2026</strong> (" + a(L.forbes, "Forbes, Oct 28, 2026") + "). That matches the StudentAid.gov timeline (Sept 29 + 30 days), but StudentAid.gov does not publish one date for everyone. Use the date on <strong>your</strong> notice.") +
        '<div class="card"><h2>Overall progress</h2>' + H.out("allProg") + "</div>" + checklist(s, stepOf("deadline"));
    } },
    { id: "login", label: "2 · Log in", render: function (s) {
      return '<div class="card"><p class="eyebrow">Step 2 · Two logins</p><h2>StudentAid.gov and your servicer</h2><p class="small">StudentAid.gov shows your plan, loan types and disbursement dates. Your servicer\'s site has your notice, inbox and bills. Help from your federal servicer is free: you never have to pay a company to change plans.</p>' +
        '<div class="field-row">' + H.input("login.newLoan", "Any loan disbursed on/after July 1, 2026 that's in repayment?", "select", { options: [["", "Not sure yet"], ["no", "No"], ["yes", "Yes"]] }) + H.input("login.pending", "Was I enrolled in SAVE, or only had a pending application?", "select", { options: [["", "Not sure yet"], ["no", "Enrolled in SAVE"], ["yes", "Pending application only"]] }) + "</div>" +
        H.out("autoBox") +
        '<div class="field-row">' + H.input("login.fsa", "Where my FSA ID login is kept", "text", { ph: "e.g. password manager (never write the password here)" }) + H.input("login.acct", "Servicer account notes", "text", { ph: "last 4 digits only" }) + "</div></div>" + checklist(s, stepOf("login"));
    } },
    { id: "compare", label: "3 · Compare", render: function (s) {
      var rows = s.plans.map(function (p, i) {
        var m = PLANS[i], b = "plans." + i + ".";
        return '<div class="row-card"><div class="card-head"><strong>' + m[1] + '</strong><span class="pill ' + (m[2] === "IDR" ? "lav" : "soft") + '">' + m[2] + '</span></div><p class="small muted">' + m[3] + " · " + m[4] + " · " + m[5] + "</p>" +
          '<div class="field-row">' + H.input(b + "elig", "Eligible?", "select", { options: [["", "—"], ["yes", "Yes"], ["no", "No"], ["cons", "Only if consolidated"]] }) + H.input(b + "monthly", "Est. monthly", "money") + H.input(b + "total", "Est. total paid", "text") + H.input(b + "end", "Payoff / end year", "text") + "</div>" + H.input(b + "note", "Notes") + "</div>";
      }).join("");
      return '<div class="card"><p class="eyebrow">Step 3 · Your numbers, side by side</p><h2>Compare in the Repayment Calculator</h2><p class="small">The Loan Simulator is now called the <strong>Repayment Calculator</strong>. Log in so it pulls your real loans. It shows estimates only: your servicer sets the final payment after it processes your application. ' + a(L.calc, "How to use it") + "</p>" +
        '<div class="rows">' + rows + '</div><p class="small muted">Plan rules from ' + a(L.save, "StudentAid.gov") + ". Which plans you can use depends on your loan types and disbursement dates. This checklist doesn't recommend a plan.</p>" +
        H.out("cmpBox") + "</div>" +
        '<div class="card blush"><h2>My decision</h2><div class="field-row">' + H.input("choice.plan", "Plan I'm applying for") + "</div>" + H.input("choice.why", "Why, in my own words", "textarea", { ph: "Monthly payment, total paid, PSLF, payoff date…" }) + "</div>" + checklist(s, stepOf("compare"));
    } },
    { id: "docs", label: "4 · Income docs", render: function (s) {
      return '<div class="card"><p class="eyebrow">Step 4 · Proof of income</p><h2>Gather income documents</h2><p>For an income-driven plan you need to show your income. With <strong>Direct Loans</strong>, the fastest way is to give consent in the application (\"Provide Approval\" under Authorization To Retrieve Federal Tax Information) so the Department gets it from the IRS. That can also let it recertify you automatically each year. FFEL loans can\'t import tax data. Otherwise, upload your latest tax return, or recent pay stubs or an employer letter if you didn\'t file.</p>' +
        '<div class="field-row">' + H.input("docs.method", "How I'll provide income", "select", { options: [["", "Choose…"], ["irs", "IRS consent / import"], ["return", "Upload tax return"], ["stubs", "Pay stubs / employer letter"]] }) + H.input("docs.taxYear", "Tax year used", "text") + H.input("docs.family", "Family size", "number", { step: "1" }) + "</div>" + H.input("docs.notes", "Income notes (stipend, RA/TA, summer pay…)", "textarea") +
        '<p class="source">' + a(L.save, "StudentAid.gov: How do I enroll in a different repayment plan?") + "</p></div>" + checklist(s, stepOf("docs"));
    } },
    { id: "apply", label: "5 · Apply", render: function (s) {
      return '<div class="card"><p class="eyebrow">Step 5 · Submit</p><h2>Submit your application</h2><p class="small">Choose \"Apply\" in the Repayment Calculator, or go straight to ' + a(L.idr, "StudentAid.gov/idr") + " (log in first). Then check \"My Activity\" on StudentAid.gov. Statuses you may see: Draft, In Progress, Cancelled, In Review, Action Required, Completed.</p>" +
        '<div class="field-row">' + H.input("apply.submitted", "Date submitted", "date") + H.input("apply.how", "How", "select", { options: [["online", "Online (StudentAid.gov)"], ["servicer", "Through my servicer"], ["paper", "Paper form"]] }) + H.input("apply.plan", "Plan requested") + "</div>" +
        '<div class="field-row">' + H.input("apply.status", "Status on My Activity", "select", { options: [["", "—"], ["draft", "Draft"], ["inprogress", "In Progress"], ["inreview", "In Review"], ["action", "Action Required"], ["completed", "Completed"], ["cancelled", "Cancelled"]] }) + H.input("apply.confNum", "Confirmation / request number") + H.input("apply.checkEvery", "Check status every (days)", "number", { step: "1" }) + "</div>" + H.out("applyBox") +
        '<p class="small">If your servicer needs more time, it may put your loans in a <strong>processing forbearance for no more than 60 days</strong> (' + a(L.save, "StudentAid.gov") + ").</p></div>" +
        reported("Borrowers on Reddit say MOHELA's processing emails mention up to <strong>90 business days</strong>, and some report waits of months. MOHELA's public pages don't give a timeframe. Log what your servicer tells you in the Call log.") + checklist(s, stepOf("apply"));
    } },
    { id: "confirm", label: "6 · Confirmations", render: function (s) {
      var rows = s.confs.map(function (c, i) {
        var b = "confs." + i + ".";
        return '<div class="row-card" data-row="confs"><div class="card-head"><strong>' + H.out("cf-" + i) + "</strong>" + H.del("confs", i) + '</div><div class="field-row">' + H.input(b + "date", "Date", "date") + H.input(b + "servicer", "Servicer / site") + H.input(b + "rep", "Rep name / ID") + H.input(b + "channel", "How", "select", { options: [["phone", "Phone"], ["online", "Online"], ["chat", "Chat"], ["email", "Email / inbox"], ["mail", "Mail"]] }) + "</div>" +
          '<div class="field-row" style="grid-template-columns:1fr 1fr">' + H.input(b + "num", "Confirmation #") + H.input(b + "what", "What it confirms") + "</div></div>";
      }).join("");
      return '<div class="card"><div class="card-head"><h2>Confirmation numbers</h2>' + H.add("confs", "Add confirmation") + '</div><p class="small">Write down every confirmation, request or call reference number with the date, servicer and rep. It\'s your proof if something goes missing.</p><div class="rows">' + (rows || '<p class="empty">No confirmations yet.</p>') + "</div></div>" + checklist(s, stepOf("confirm"));
    } },
    { id: "bill", label: "7 · First bill", render: function (s) {
      return '<div class="card"><p class="eyebrow">Step 7 · Check the math</p><h2>Your first bill vs. the estimate</h2><p class="small">Your servicer will tell you the new payment at least 21 days before the first due date. If you use autopay, the withdrawal changes with it.</p>' +
        '<div class="field-row">' + H.input("bill.estimate", "Repayment Calculator estimate", "money") + H.input("bill.amount", "Amount on my first bill", "money") + H.input("bill.noticeDate", "Date I got the payment notice", "date") + H.input("bill.firstDue", "First due date", "date") + "</div>" +
        '<div class="stat-grid"><div class="stat"><div class="label">Difference</div><div class="value">' + H.out("diff") + '</div></div><div class="stat lav"><div class="label">Days until first due date</div><div class="value">' + H.out("dueIn") + "</div></div></div>" + H.out("billBox") +
        '<div class="field-row">' + H.input("bill.autopay", "Autopay", "select", { options: [["", "—"], ["yes", "On"], ["no", "Off"]] }) + "</div>" + H.input("bill.notes", "Notes", "textarea") +
        '<p class="small">Autopay: eligible borrowers who enroll by <strong>Dec 31, 2026</strong> get a <strong>1% interest-rate reduction through June 30, 2028</strong> (' + a(L.save, "StudentAid.gov") + "; " + a(L.edfin, "Edfinancial") + "). If a bill looks wrong, call your servicer and log the call. You can also file a complaint with the " + a(L.cfpb, "CFPB") + ".</p></div>" + checklist(s, stepOf("bill"));
    } },
    { id: "remind", label: "8 · Reminders", render: function (s) {
      var rows = s.rems.map(function (r, i) {
        var b = "rems." + i + ".";
        return '<div class="row-card" data-row="rems"><div class="field-row">' + H.input(b + "title", "Reminder") + H.input(b + "date", "Date", "date") + H.input(b + "note", "Note") + "</div>" + H.del("rems", i) + "</div>";
      }).join("");
      var btn = "";
      btn = '<button type="button" class="btn sm no-print" data-action="ics">⬇ Add all to calendar (.ics)</button>';
      return '<div class="card"><p class="eyebrow">Step 8 · Don\'t rely on memory</p><h2>Reminders</h2><p class="small">Pick what to include. Dates come from the other steps.</p>' +
        H.input("remOpts.deadline", "My SAVE exit deadline", "check") + H.input("remOpts.weekBefore", "One week before the deadline", "check") + H.input("remOpts.status", "Check my application status", "check") + H.input("remOpts.firstDue", "First bill: a week before, and the due date", "check") + H.input("remOpts.autopay", "Autopay discount cutoff (Dec 31, 2026)", "check") +
        '<div class="field-row">' + H.input("remOpts.recert", "IDR recertification date", "date", { hint: "(from your servicer)" }) + "</div>" +
        '<h3>My own reminders</h3><div class="rows">' + (rows || '<p class="empty">None yet.</p>') + "</div><p>" + H.add("rems", "Add reminder") + "</p>" +
        "<h3>Coming up</h3>" + H.out("remList") + '<p style="margin-top:.8rem">' + btn + '</p><p class="small muted">The .ics file works with Apple, Google and Outlook calendars. Each event has a reminder the day before.</p></div>' + checklist(s, stepOf("remind"));
    } },
    { id: "forb", label: "9 · Forbearance", render: function (s) {
      return '<div class="card"><p class="eyebrow">Step 9 · Know the tradeoffs</p><h2>Forbearance: what it costs</h2><ul class="small">' +
        "<li><strong>Interest builds.</strong> Interest on SAVE loans started accruing again on Aug 1, 2025 (" + a(L.edInterest, "ED.gov") + "). In a forbearance you're responsible for the interest that accrues (" + a(L.edfin, "Edfinancial") + ").</li>" +
        "<li><strong>No progress.</strong> Time in the SAVE forbearance doesn't count toward PSLF or IDR discharge (" + a(L.save, "StudentAid.gov") + ").</li>" +
        "<li><strong>Processing forbearance</strong> while an IDR application is handled lasts no more than 60 days (" + a(L.save, "StudentAid.gov") + ").</li>" +
        "<li><strong>Short-term relief exists.</strong> If you can't afford the new payment, you can ask your servicer for a deferment or forbearance. Both can affect PSLF and IDR discharge, and repeatedly missed payments lead to credit damage (" + a(L.save, "StudentAid.gov") + ").</li>" +
        "<li>You can make payments of any amount during a forbearance, and you can ask to end it at any time (" + a(L.edfin, "Edfinancial") + ").</li></ul>" +
        '<div class="field-row">' + H.input("forb.inForb", "In forbearance now?", "select", { options: [["", "Not sure"], ["yes", "Yes"], ["no", "No"]] }) + H.input("forb.type", "Which kind (per my servicer)") + H.input("forb.ends", "Ends (per my servicer)", "date") + "</div>" + H.input("forb.notes", "Questions for my servicer", "textarea", { ph: "e.g. What status will my loans be in while my application is processed?" }) + "</div>" +
        checklist(s, stepOf("forb"));
    } },
    { id: "pslf", label: "10 · PSLF", render: function (s) {
      return '<div class="card"><p class="eyebrow">Step 10 · Public Service Loan Forgiveness</p><h2>PSLF notes</h2><ul class="small">' +
        "<li>Changing plans doesn't remove qualifying PSLF payments you made <strong>before</strong> the SAVE forbearance.</li>" +
        "<li>Time in the SAVE forbearance does <strong>not</strong> count toward PSLF.</li>" +
        "<li><strong>Buyback:</strong> you may be able to buy back months spent in an ineligible deferment or forbearance, including the SAVE forbearance, but only once you have 120 months of qualifying employment and the buyback would get you to forgiveness. " + a(L.buyback, "StudentAid.gov/pslfbuyback") + " · " + a(L.mohelaPslf, "MOHELA PSLF info") + "</li>" +
        "<li>Plans that count for PSLF include all IDR plans: IBR, ICR, PAYE and RAP. <strong>Tiered Standard payments do not count</strong>, and Tiered Standard is the automatic plan for some borrowers who miss the deadline.</li>" +
        "<li>Consolidating creates a new loan. Qualifying payments on included Direct Loans carry over as a weighted average.</li>" +
        "<li>StudentAid.gov suggests submitting a PSLF form each year and when you change jobs.</li></ul><p class='source'>" + a(L.save, "StudentAid.gov SAVE FAQ, questions 9–10") + " · " + a(L.pslf, "PSLF Help Tool") + "</p>" +
        '<div class="field-row">' + H.input("pslf.employer", "Qualifying employer") + H.input("pslf.count", "Qualifying payments so far", "number", { step: "1" }) + H.input("pslf.saveMonths", "Months in SAVE forbearance", "number", { step: "1" }) + H.input("pslf.lastForm", "Last PSLF form submitted", "date") + "</div>" + H.out("pslfBox") + H.input("pslf.notes", "Notes", "textarea") + "</div>" + checklist(s, stepOf("pslf"));
    } },
    { id: "calls", label: "Call log", render: function (s) {
      var rows = s.calls.map(function (c, i) {
        var b = "calls." + i + ".";
        return '<div class="row-card" data-row="calls"><div class="card-head"><strong>' + H.out("cl-" + i) + "</strong>" + H.del("calls", i) + '</div><div class="field-row">' + H.input(b + "date", "Date", "date") + H.input(b + "time", "Time", "time") + H.input(b + "servicer", "Who I contacted") + H.input(b + "rep", "Rep name / ID") + "</div>" +
          '<div class="field-row">' + H.input(b + "phone", "Number / channel") + H.input(b + "mins", "Minutes", "number", { step: "1" }) + H.input(b + "followUp", "Follow up by", "date") + "</div>" + H.input(b + "summary", "What they said / what I asked for", "textarea") + "</div>";
      }).join("");
      return '<div class="card"><div class="card-head"><h2>Contact & call log</h2>' + H.add("calls", "Log a call") + '</div><p class="small">Note the rep\'s name or ID and any reference number before you hang up. Follow-up dates show up in Reminders.</p><div class="rows">' + (rows || '<p class="empty">No calls logged yet.</p>') + "</div>" + H.out("callSum") + "</div>";
    } },
    { id: "sources", label: "Sources", render: function () {
      return '<div class="card soft" id="sources"><h2>Sources</h2><ul class="small">' +
        "<li>" + a(L.save, "StudentAid.gov: SAVE Plan Borrowers, FAQs About Choosing a Different Repayment Plan (Oct 2026)") + ": 90 days from the servicer notice (July 1 notice → Sept 29 deadline); final 30-day notice; automatic Standard or Tiered Standard placement; pending SAVE applications go back to the prior plan; notice subject lines and servicer emails; plan list and formulas; 21-day payment notice; processing forbearance up to 60 days; IRS consent; autopay 1% reduction; PSLF and SAVE forbearance; buyback.</li>" +
        "<li>" + a(L.calc, "StudentAid.gov: Compare Repayment Plans With Our Repayment Calculator (Aug 2026)") + ": formerly Loan Simulator; results are estimates and your servicer sets final terms.</li>" +
        "<li>" + a(L.edNext, "ED.gov press release, Mar 27, 2026") + ": servicers begin 90-day notices July 1; auto-enrollment in Standard or Tiered Standard.</li>" +
        "<li>" + a(L.court, "StudentAid.gov: Court actions") + ": the Mar 10, 2026 court order that ended SAVE.</li>" +
        "<li>" + a(L.edInterest, "ED.gov press release, July 9, 2025") + ": interest on SAVE loans resumes Aug 1, 2025.</li>" +
        "<li>" + a(L.edfin, "Edfinancial FAQs (federal servicer, studentaid.gov)") + ": you can request a plan change any time during repayment, no fee; forbearance interest; autopay 1% reduction.</li>" +
        "<li>" + a(L.mohelaSave, "MOHELA SAVE Plan FAQ") + " · " + a(L.mohelaPslf, "MOHELA PSLF information (buyback)") + "</li>" +
        "<li>" + a(L.idr, "IDR application") + " · " + a(L.servicers, "Find your servicer") + " · " + a(L.pslf, "PSLF Help Tool") + " · " + a(L.cfpb, "CFPB complaint") + "</li>" +
        "<li><span class='pill warn'>Reported</span> " + a(L.forbes, "Forbes, Oct 28, 2026") + ": first final-notice deadline Oct 29, 2026. Reddit (r/MOHELA, r/StudentLoans): MOHELA processing emails citing up to 90 business days. Neither is confirmed by an official source.</li></ul>" +
        "<p class='small muted'>Checked Oct 28, 2026. Rules change. StudentAid.gov and your servicer have the final word on your account.</p></div>";
    } }
  ];
  var actions = {
    ics: function (s) {
      var td = H.today(), ev = reminders(s).filter(function (x) { return x.date >= td; }); if (!ev.length) { alert("No upcoming dates yet. Add a deadline or reminder date first."); return; }
      function e(t) { return String(t || "").replace(/[\\;,]/g, function (c) { return "\\" + c; }).replace(/\n/g, "\\n"); }
      var st = new Date().toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z";
      var L2 = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Grad-IQ//SAVE Plan Exit Checklist//EN", "CALSCALE:GREGORIAN"];
      ev.forEach(function (x, i) { var d = x.date.replace(/-/g, ""), n = addDays(x.date, 1).replace(/-/g, ""); L2.push("BEGIN:VEVENT", "UID:gradiq-save-" + d + "-" + i + "@grad-iq", "DTSTAMP:" + st, "DTSTART;VALUE=DATE:" + d, "DTEND;VALUE=DATE:" + n, "SUMMARY:" + e(x.title), "DESCRIPTION:" + e((x.note ? x.note + " " : "") + "Check StudentAid.gov and your servicer."), "BEGIN:VALARM", "ACTION:DISPLAY", "DESCRIPTION:" + e(x.title), "TRIGGER:-P1D", "END:VALARM", "END:VEVENT"); });
      L2.push("END:VCALENDAR");
      var b = new Blob([L2.join("\r\n")], { type: "text/calendar" }), el = document.createElement("a"); el.href = URL.createObjectURL(b); el.download = "save-exit-reminders.ics"; document.body.appendChild(el); el.click(); setTimeout(function () { URL.revokeObjectURL(el.href); el.remove(); }, 500);
    }
  };
  function compute(s) {
    var o = {}, total = 0, done = 0;
    STEPS.forEach(function (st) { var d = stepDone(s, st); total += st.checks.length; done += d; o["sp-" + st.id] = d + " of " + st.checks.length + " done"; });
    var stepsDone = STEPS.filter(function (st) { return stepDone(s, st) === st.checks.length; }).length;
    o.allProg = { html: '<div class="bar save"><span style="width:' + Math.round(done / total * 100) + '%"></span></div><p class="small" style="margin-top:.3rem">' + stepsDone + " of 10 steps complete · " + done + " of " + total + " checklist items</p>" };
    var dl = deadline(s);
    if (dl) {
      var n = daysTo(dl.date);
      o.dlBox = { html: '<div class="days">' + (n >= 0 ? n : "!") + "</div><p>" + (n > 1 ? "days until <strong>" + fmt(dl.date) + "</strong>" : n === 1 ? "day: deadline is <strong>tomorrow</strong>, " + fmt(dl.date) : n === 0 ? "deadline is <strong>today</strong>" : "this deadline (" + fmt(dl.date) + ") has passed. You can still apply for a plan; see step 5.") + '</p><p class="small muted">From ' + dl.how + ". The date on your own notice is the one that counts.</p>" + (s.dl.type === "90" && s.dl.noticeDate && !s.dl.printed ? '<p class="small">If you miss this one, a final 30-day notice comes next.</p>' : "") };
    } else o.dlBox = { html: '<p class="muted">Enter your notice date (or the deadline printed on it) to see your countdown.</p>' };
    var sv = s.dl.servicer;
    o.senderBox = { html: SENDER[sv] ? '<div class="notice"><p>Search your email for <strong>' + H.esc(SENDER[sv]) + '</strong>, or the subject lines "You Have 90 Days to Select a New Repayment Plan" and "Final Notice – You will be Placed into a New Repayment Plan in 30 Days".</p></div>' : sv ? '<div class="notice"><p>Search your email for the subject lines "You Have 90 Days to Select a New Repayment Plan" and "Final Notice – You will be Placed into a New Repayment Plan in 30 Days", and check your servicer\'s website inbox.</p></div>' : "" };
    var lg = s.login, auto;
    if (lg.pending === "yes") auto = "the plan you were on before you applied for SAVE";
    else if (lg.newLoan === "yes") auto = "the Tiered Standard Plan";
    else if (lg.newLoan === "no") auto = "the Standard Repayment Plan";
    o.autoBox = { html: auto ? '<div class="notice"><p>Per StudentAid.gov, if you don\'t choose a plan by the final deadline, you\'d be placed in <strong>' + auto + "</strong>. Your servicer can confirm.</p></div>" : '<p class="small muted">Answer both questions to see which plan StudentAid.gov says you\'d be placed in if you don\'t choose one.</p>' };
    var el = s.plans.filter(function (p) { return p.elig === "yes" && H.num(p.monthly); });
    o.cmpBox = { html: el.length ? '<div class="notice"><p>' + el.length + " eligible plan" + (el.length > 1 ? "s" : "") + " with estimates: " + el.map(function (p) { return PLANS.filter(function (m) { return m[0] === p.id; })[0][1].replace(/ \(.*\)/, "") + " " + H.money(p.monthly) + "/mo"; }).join(" · ") + "</p></div>" : "" };
    var ap = s.apply;
    o.applyBox = { html: ap.status === "action" ? '<div class="notice"><p><span class="pill bad">Action Required</span> Open My Activity on StudentAid.gov: you may need to add information or a signature.</p></div>' : ap.status === "completed" ? '<p><span class="pill ok">Completed</span> Watch for your servicer\'s new-payment notice (step 7).</p>' : ap.submitted ? '<p class="small">Submitted ' + fmt(ap.submitted) + " (" + Math.max(0, -daysTo(ap.submitted)) + " days ago).</p>" : "" };
    s.confs.forEach(function (c, i) { o["cf-" + i] = (c.num || "Confirmation " + (i + 1)) + (c.date ? " · " + fmt(c.date) : ""); });
    var est = H.num(s.bill.estimate), amt = H.num(s.bill.amount), df = amt - est;
    o.diff = est && amt ? (df > 0 ? "+" : df < 0 ? "−" : "") + H.money(Math.abs(df), true) : "—";
    o.dueIn = s.bill.firstDue ? String(Math.max(0, daysTo(s.bill.firstDue))) : "—";
    var gap = s.bill.noticeDate && s.bill.firstDue ? Math.round((new Date(s.bill.firstDue) - new Date(s.bill.noticeDate)) / 864e5) : null;
    o.billBox = { html: (est && amt ? (Math.abs(df) < 1 ? '<p><span class="pill ok">Matches the estimate</span></p>' : '<div class="notice"><p>Your bill is <strong>' + H.money(Math.abs(df), true) + (df > 0 ? " higher" : " lower") + "</strong> than the estimate. Estimates can differ from the final amount. Ask your servicer what income, family size and plan it used, and log the call.</p></div>") : "") + (gap !== null && gap < 21 ? '<p><span class="pill warn">Notice came ' + gap + " days before the due date</span> Servicers are supposed to notify you at least 21 days ahead. Ask your servicer about it.</p>" : "") };
    var rl = reminders(s);
    o.remList = { html: rl.length ? rl.map(function (r) { var n = daysTo(r.date); return '<div class="kv"><span>' + H.esc(r.title) + (r.note ? ' <span class="small muted">· ' + H.esc(r.note) + "</span>" : "") + '</span><strong><span class="pill ' + (n < 0 ? "lav" : n <= 7 ? "warn" : "ok") + '">' + fmt(r.date) + "</span></strong></div>"; }).join("") : '<p class="muted">Fill in dates in the other steps to build your reminder list.</p>' };
    s.calls.forEach(function (c, i) { o["cl-" + i] = (c.servicer || "Call " + (i + 1)) + (c.date ? " · " + fmt(c.date) : ""); });
    var mins = s.calls.reduce(function (t, c) { return t + H.num(c.mins); }, 0);
    o.callSum = s.calls.length ? s.calls.length + " contact" + (s.calls.length > 1 ? "s" : "") + " logged · " + mins + " minutes on hold or on the phone" : "";
    var pc = H.num(s.pslf.count);
    o.pslfBox = { html: pc ? '<p class="small">' + pc + " of 120 qualifying payments · " + Math.max(0, 120 - pc) + " to go (your count on StudentAid.gov is the official one).</p>" : "" };
    return o;
  }
  var tables = {
    confirmations: { label: "Confirmations", rows: function (s) { var r = [["Date", "Servicer/site", "Rep", "Channel", "Confirmation #", "What"]]; s.confs.forEach(function (c) { r.push([c.date, c.servicer, c.rep, c.channel, c.num, c.what]); }); return r; } },
    calls: { label: "Call log", rows: function (s) { var r = [["Date", "Time", "Contacted", "Rep", "Number/channel", "Minutes", "Summary", "Follow up by"]]; s.calls.forEach(function (c) { r.push([c.date, c.time, c.servicer, c.rep, c.phone, c.mins, c.summary, c.followUp]); }); return r; } },
    plans: { label: "Plan comparison", rows: function (s) { var r = [["Plan", "Type", "Eligible", "Est. monthly", "Est. total", "End", "Notes"]]; s.plans.forEach(function (p, i) { r.push([PLANS[i][1], PLANS[i][2], p.elig, p.monthly, p.total, p.end, p.note]); }); return r; } },
    reminders: { label: "Reminders", rows: function (s) { var r = [["Date", "Reminder", "Note"]]; reminders(s).forEach(function (x) { r.push([x.date, x.title, x.note]); }); return r; } }
  };
  window.PLANNER = { key: "gradiq-save-exit-v1", slug: "save-plan-exit-checklist", title: "SAVE Plan Exit Checklist", disclaimer: "Not financial advice. Rules change; always check StudentAid.gov and your servicer.", defaults: defaults, demo: demo, sections: sections, compute: compute, actions: actions, tables: tables, templates: { confs: conf, calls: call, rems: rem } };
})();

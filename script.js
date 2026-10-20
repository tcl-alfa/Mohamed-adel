/* ============================================================
   عدّل البيانات هنا فقط
   ============================================================ */
const profile = {
  name:  "Mohamed Adel",
  title: "Sales Account Manager",

  photo: "profile.jpg",     // صورتك الشخصية (بجانب الملفات)
  logo:  "logo.png",        // صورة اللوجو (بجانب الملفات)
  logoLink: "#",            // الرابط اللي يفتح لما تضغط على اللوجو (موقع الشركة مثلاً)

  /* ---- الاتصال ---- */
  callNumber: "01001563823",      // الرقم اللي هيتصل بيه الزرار
  callText:   "01001563823",      // النص اللي يظهر تحت "Call me"

  /* ---- واتساب ---- */
  whatsappNumber: "201001563823", // بالصيغة الدولية بدون + أو أصفار (مصر = 20)
  whatsappText:   "01001563823",  // النص اللي يظهر تحت "Chat on WhatsApp"

  /* ---- لينكدإن ---- */
  linkedin:     "https://www.linkedin.com/in/mohamed-adel-135785264/?isSelfProfile=false",
  linkedinText: "Mohamed Adel",    // النص اللي يظهر تحت "Connect With Me"

  /* ---- الإيميل ---- */
  email:     "Mohamed.adel@alfagroup-egy.com",
  emailText: "Mohamed.adel@alfagroup-egy.com",  // النص اللي يظهر تحت "Email Me"

  /* ---- السوشيال ---- */
  facebook:  "https://www.facebook.com/TCL.Alfa/",
  instagram: "https://www.instagram.com/tcl.alfa",
  linkedintwo: "https://www.linkedin.com/company/tcl-alfa-alfa-group/"
};
/* ============================================================ */

const $ = (id) => document.getElementById(id);

// Content
$("name").textContent  = profile.name;
$("title").textContent = profile.title;
$("photo").src = profile.photo;
$("logo").src  = profile.logo;
$("brandLink").href = profile.logoLink;
document.title = `${profile.name} | Alfa`;

// Call
$("callBtn").href = `tel:${profile.callNumber}`;
$("callText").textContent = profile.callText;

// WhatsApp
const waUrl = `https://wa.me/${profile.whatsappNumber}`;
$("waBtn").href  = waUrl;
$("waLink").href = waUrl;
$("waText").textContent = profile.whatsappText;

// LinkedIn
$("liBtn").href  = profile.linkedin;
$("liLink").href = profile.linkedintwo;
$("liText").textContent = profile.linkedinText;

// Email
$("mailBtn").href = `mailto:${profile.email}`;
$("mailText").textContent = profile.emailText;

// Social
$("fbLink").href = profile.facebook;
$("igLink").href = profile.instagram;

// Toast
let toastTimer;
function showToast(msg) {
  const t = $("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
}

// Share
$("shareBtn").addEventListener("click", async () => {
  const data = {
    title: `${profile.name} - Alfa`,
    text: `${profile.name} | ${profile.title}`,
    url: location.href
  };
  try {
    if (navigator.share) {
      await navigator.share(data);
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(location.href);
      showToast("Link copied");
    } else {
      showToast(location.href);
    }
  } catch (err) {
    /* user cancelled */
  }
});

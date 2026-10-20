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
  linkedintwo: "https://www.linkedin.com/company/tcl-alfa-alfa-group/",
  website: "https://alfagroup-egy.com/"   // رابط الموقع — عدّله لو مختلف
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
$("webLink").href = profile.website;

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
async function copyLink(url) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(url);
      return true;
    }
  } catch (e) { /* نكمل للطريقة البديلة */ }
  try {
    const ta = document.createElement("textarea");
    ta.value = url;
    ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed;top:-1000px;opacity:0";
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, url.length);
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  } catch (e) {
    return false;
  }
}

$("shareBtn").addEventListener("click", async () => {
  const url = location.href;
  const data = {
    title: `${profile.name} - Alfa`,
    text: `${profile.name} | ${profile.title}`,
    url
  };

  // 1) مشاركة النظام (موبايل / بعض المتصفحات)
  if (navigator.share) {
    try {
      await navigator.share(data);
      return;
    } catch (err) {
      if (err && err.name === "AbortError") return;   // المستخدم قفل نافذة المشاركة
      /* أي خطأ تاني → نكمل لنسخ الرابط */
    }
  }

  // 2) نسخ الرابط + رسالة تأكيد
  const ok = await copyLink(url);
  showToast(ok ? "Link copied" : url);
});

// Lightbox: فتح الصورة بالحجم الكبير
const lightbox = $("lightbox");
function openLightbox() {
  const photo = $("photo");
  $("lightboxImg").src = photo.currentSrc || photo.src;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
}
function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
}
$("avatarBtn").addEventListener("click", openLightbox);
lightbox.addEventListener("click", closeLightbox);
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });

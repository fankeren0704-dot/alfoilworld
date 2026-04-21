function mountInquiryForm() {
  const form = document.querySelector("#inquiry-form-element");
  const status = document.querySelector("#form-status");
  const submitButton = document.querySelector("#inquiry-submit");

  if (!form || !status || !submitButton) {
    return;
  }

  const locale = document.body.dataset.locale || "en";
  const copy =
    locale === "zh"
      ? {
          requiredMessage: "请补全这个必填字段。",
          emailMessage: "请输入有效的邮箱地址。",
          urlMessage: "请输入有效的网址链接，例如 https://example.com。",
          statusError:
            "请先补全所有必填字段，并修正格式错误后再提交。",
          offline:
            "当前设备似乎处于离线状态，请联网后重试，或直接联系平台团队。",
          preparingButton: "整理中...",
          preparingStatus: "正在整理你的询盘摘要，并准备打开邮件草稿，请稍候。",
          successStatus:
            "询盘摘要已整理完成，正在为你打开邮件草稿。若未自动打开，请使用页面中的联系入口继续提交。",
          notSpecified: "未填写",
          notProvided: "未填写",
          summary: {
            company: "公司名称",
            contact: "联系人",
            email: "邮箱",
            phone: "WhatsApp / 微信",
            website: "官网",
            application: "用途方向",
            alloy: "合金牌号",
            temper: "状态",
            thickness: "厚度",
            width: "宽度",
            surface: "表面与附加要求",
            market: "目标市场",
            certification: "认证要求",
            incoterm: "贸易术语",
            volume: "采购规模",
            delivery: "交付周期",
            destination: "目的港 / 城市",
            preference: "偏好供应商类型",
            notes: "询盘说明"
          },
          subjectPrefix: "全球铝箔采购询盘 - "
        }
      : {
          requiredMessage: "Please complete this required field.",
          emailMessage: "Please enter a valid email address.",
          urlMessage: "Please enter a valid website URL, such as https://example.com.",
          statusError:
            "Please complete all required fields and correct any format issues before submitting.",
          offline:
            "Your device appears to be offline. Please reconnect and try again, or contact our team directly.",
          preparingButton: "Preparing...",
          preparingStatus:
            "We are preparing your inquiry summary and opening a draft email for your review.",
          successStatus:
            "Your inquiry summary is ready. We are now opening an email draft so you can send it to our team.",
          notSpecified: "Not specified",
          notProvided: "Not provided",
          summary: {
            company: "Company",
            contact: "Contact name",
            email: "Email",
            phone: "WhatsApp / WeChat",
            website: "Website",
            application: "Application focus",
            alloy: "Alloy",
            temper: "Temper",
            thickness: "Thickness",
            width: "Width",
            surface: "Surface and additional requirements",
            market: "Target market",
            certification: "Certification",
            incoterm: "Incoterm",
            volume: "Annual volume or trial plan",
            delivery: "Delivery timing",
            destination: "Delivery port / destination",
            preference: "Preferred supplier profile",
            notes: "Inquiry notes"
          },
          subjectPrefix: "Global Aluminum Foil Inquiry - "
        };

  const statusClasses = ["is-visible", "is-submitting", "is-success", "is-error"];

  const setStatus = (type, message) => {
    status.classList.remove(...statusClasses);
    if (type) {
      status.classList.add("is-visible", type);
      status.textContent = message;
    } else {
      status.textContent = "";
    }
  };

  const clearFieldState = (field) => {
    const wrapper = field.closest("[data-field]");
    if (!wrapper) {
      return;
    }

    wrapper.classList.remove("is-invalid");
    const errorNode = wrapper.querySelector(".field-error");
    if (errorNode) {
      errorNode.textContent = "";
    }
  };

  const showFieldError = (field, message) => {
    const wrapper = field.closest("[data-field]");
    if (!wrapper) {
      return;
    }

    wrapper.classList.add("is-invalid");
    const errorNode = wrapper.querySelector(".field-error");
    if (errorNode) {
      errorNode.textContent = message;
    }
  };

  const validateField = (field) => {
    clearFieldState(field);
    field.setCustomValidity("");

    const value = field.value.trim();
    if (field.hasAttribute("required") && !value) {
      showFieldError(field, copy.requiredMessage);
      return false;
    }

    if (field.type === "email" && value) {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      if (!isValidEmail) {
        showFieldError(field, copy.emailMessage);
        return false;
      }
    }

    if (field.type === "url" && value) {
      try {
        const url = new URL(value);
        if (!/^https?:$/.test(url.protocol)) {
          throw new Error("invalid");
        }
      } catch (error) {
        showFieldError(field, copy.urlMessage);
        return false;
      }
    }

    return true;
  };

  const fields = Array.from(
    form.querySelectorAll("input:not([type='checkbox']), select, textarea")
  );

  fields.forEach((field) => {
    field.addEventListener("input", () => {
      clearFieldState(field);
      if (status.classList.contains("is-error")) {
        setStatus(null, "");
      }
    });

    field.addEventListener("blur", () => validateField(field));
  });

  const buildMailto = () => {
    const data = new FormData(form);
    const preferences = data.getAll("supplier_preference").join(" / ") || copy.notSpecified;
    const summary = [
      `${copy.summary.company}: ${data.get("company") || ""}`,
      `${copy.summary.contact}: ${data.get("contact_name") || ""}`,
      `${copy.summary.email}: ${data.get("email") || ""}`,
      `${copy.summary.phone}: ${data.get("phone") || copy.notProvided}`,
      `${copy.summary.website}: ${data.get("website") || copy.notProvided}`,
      `${copy.summary.application}: ${data.get("application") || ""}`,
      `${copy.summary.alloy}: ${data.get("alloy") || ""}`,
      `${copy.summary.temper}: ${data.get("temper") || ""}`,
      `${copy.summary.thickness}: ${data.get("thickness") || ""}`,
      `${copy.summary.width}: ${data.get("width") || copy.notProvided}`,
      `${copy.summary.surface}: ${data.get("surface") || copy.notProvided}`,
      `${copy.summary.market}: ${data.get("market") || ""}`,
      `${copy.summary.certification}: ${data.get("certification") || copy.notProvided}`,
      `${copy.summary.incoterm}: ${data.get("incoterm") || ""}`,
      `${copy.summary.volume}: ${data.get("volume") || ""}`,
      `${copy.summary.delivery}: ${data.get("delivery") || copy.notProvided}`,
      `${copy.summary.destination}: ${data.get("destination") || copy.notProvided}`,
      `${copy.summary.preference}: ${preferences}`,
      "",
      `${copy.summary.notes}:`,
      String(data.get("message") || "").slice(0, 800)
    ].join("\n");

    const subject = encodeURIComponent(
      `${copy.subjectPrefix}${data.get("company") || (locale === "zh" ? "采购方" : "Buyer")}`
    );
    const body = encodeURIComponent(summary);
    return `mailto:contact@alfoilworld.com?subject=${subject}&body=${body}`;
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let isValid = true;
    fields.forEach((field) => {
      if (!validateField(field)) {
        isValid = false;
      }
    });

    if (!isValid) {
      setStatus("is-error", copy.statusError);
      const firstInvalid = form.querySelector(".is-invalid input, .is-invalid select, .is-invalid textarea");
      if (firstInvalid) {
        firstInvalid.focus();
      }
      return;
    }

    if (!navigator.onLine) {
      setStatus("is-error", copy.offline);
      return;
    }

    submitButton.disabled = true;
    const originalText = submitButton.textContent;
    submitButton.textContent = copy.preparingButton;
    setStatus("is-submitting", copy.preparingStatus);

    window.setTimeout(() => {
      const mailtoLink = buildMailto();
      setStatus("is-success", copy.successStatus);
      submitButton.disabled = false;
      submitButton.textContent = originalText;
      window.location.href = mailtoLink;
    }, 900);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mountInquiryForm);
} else {
  mountInquiryForm();
}

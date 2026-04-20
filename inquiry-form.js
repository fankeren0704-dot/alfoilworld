function mountInquiryForm() {
  const form = document.querySelector("#inquiry-form-element");
  const status = document.querySelector("#form-status");
  const submitButton = document.querySelector("#inquiry-submit");

  if (!form || !status || !submitButton) {
    return;
  }

  const requiredMessage = "请补全这个必填字段。";
  const emailMessage = "请输入有效的邮箱地址。";
  const urlMessage = "请输入有效的网址链接，格式如 https://example.com";

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
      showFieldError(field, requiredMessage);
      return false;
    }

    if (field.type === "email" && value) {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      if (!isValidEmail) {
        showFieldError(field, emailMessage);
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
        showFieldError(field, urlMessage);
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
    const preferences = data.getAll("supplier_preference").join(" / ") || "未指定";
    const summary = [
      `公司名称: ${data.get("company") || ""}`,
      `联系人: ${data.get("contact_name") || ""}`,
      `邮箱: ${data.get("email") || ""}`,
      `电话: ${data.get("phone") || "未填写"}`,
      `官网: ${data.get("website") || "未填写"}`,
      `用途方向: ${data.get("application") || ""}`,
      `合金牌号: ${data.get("alloy") || ""}`,
      `状态: ${data.get("temper") || ""}`,
      `厚度: ${data.get("thickness") || ""}`,
      `宽度: ${data.get("width") || "未填写"}`,
      `表面与附加要求: ${data.get("surface") || "未填写"}`,
      `目标市场: ${data.get("market") || ""}`,
      `认证要求: ${data.get("certification") || "未填写"}`,
      `贸易术语: ${data.get("incoterm") || ""}`,
      `采购规模: ${data.get("volume") || ""}`,
      `交付周期: ${data.get("delivery") || "未填写"}`,
      `目的港 / 城市: ${data.get("destination") || "未填写"}`,
      `偏好供应商类型: ${preferences}`,
      "",
      "询盘说明:",
      String(data.get("message") || "").slice(0, 800)
    ].join("\n");

    const subject = encodeURIComponent(
      `Global Aluminum Foil Inquiry - ${data.get("company") || "Buyer"}`
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
      setStatus("is-error", "请先补全标记为必填的字段，并修正格式错误后再提交。");
      const firstInvalid = form.querySelector(".is-invalid input, .is-invalid select, .is-invalid textarea");
      if (firstInvalid) {
        firstInvalid.focus();
      }
      return;
    }

    if (!navigator.onLine) {
      setStatus("is-error", "当前设备似乎处于离线状态，暂时无法发起邮件草稿。请联网后重试，或直接联系商务顾问。");
      return;
    }

    submitButton.disabled = true;
    const originalText = submitButton.textContent;
    submitButton.textContent = "提交中...";
    setStatus("is-submitting", "正在整理你的询盘摘要并准备提交动作，请稍候...");

    window.setTimeout(() => {
      const mailtoLink = buildMailto();
      setStatus("is-success", "询盘信息已整理完成，正在为你打开邮件草稿。若未自动打开，请使用下方联系按钮继续提交。");
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

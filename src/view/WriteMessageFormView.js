class WriteMessageFormView {
  static FORM_ROOT_ID = 'writeMessage';
  static FORM_ROOT_CLASS = 'messages__form';

  constructor(options) {
    const { onSubmit } = options;
    this.formRootEl = null;
    this.onSubmit = onSubmit;
  }

  appendTo(containerEl) {
    const formRootHtml = this.generateWriteMessageFormHtml();
    containerEl.insertAdjacentHTML('beforeend', formRootHtml);
    this.formRootEl = containerEl.querySelector(`#${WriteMessageFormView.FORM_ROOT_ID}`);
    this.formRootEl.addEventListener('submit', this.onFormRootElSubmit.bind(this));
  }

  onFormRootElSubmit(event) {
    event.preventDefault();

    const { target } = event;
    const formData = new FormData(target);
    const data = [];

    formData.forEach((item, name) => {
      data.push({ name, value: String(item) });
    })

    const validFormData = data.reduce((acc, field) => ({...acc, [field.name]: field.value}), {});

    if(!validFormData.username || !validFormData.message) {
      return;
    }

    this.onSubmit(validFormData);
    event.target.reset();
  }

  generateWriteMessageFormHtml() {
    return `
      <form class="${WriteMessageFormView.FORM_ROOT_CLASS}" id="${WriteMessageFormView.FORM_ROOT_ID}">
        <input name="username" placeholder="Enter your name" />
        <input name="message" placeholder="Enter your message" />
        <button type="submit">SEND &#10148;</button>
      </form>
    `
  }
}

export default WriteMessageFormView;

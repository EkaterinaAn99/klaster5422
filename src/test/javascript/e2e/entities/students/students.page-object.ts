import { element, by, ElementFinder } from 'protractor';

export class StudentsComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-students div table .btn-danger'));
  title = element.all(by.css('jhi-students div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class StudentsUpdatePage {
  pageTitle = element(by.id('jhi-students-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  surnameInput = element(by.id('field_surname'));
  middleNameInput = element(by.id('field_middleName'));
  groupInput = element(by.id('field_group'));
  typeInput = element(by.id('field_type'));

  userSelect = element(by.id('field_user'));
  teachersSelect = element(by.id('field_teachers'));
  groupOfStudentsSelect = element(by.id('field_groupOfStudents'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setSurnameInput(surname: string): Promise<void> {
    await this.surnameInput.sendKeys(surname);
  }

  async getSurnameInput(): Promise<string> {
    return await this.surnameInput.getAttribute('value');
  }

  async setMiddleNameInput(middleName: string): Promise<void> {
    await this.middleNameInput.sendKeys(middleName);
  }

  async getMiddleNameInput(): Promise<string> {
    return await this.middleNameInput.getAttribute('value');
  }

  async setGroupInput(group: string): Promise<void> {
    await this.groupInput.sendKeys(group);
  }

  async getGroupInput(): Promise<string> {
    return await this.groupInput.getAttribute('value');
  }

  async setTypeInput(type: string): Promise<void> {
    await this.typeInput.sendKeys(type);
  }

  async getTypeInput(): Promise<string> {
    return await this.typeInput.getAttribute('value');
  }

  async userSelectLastOption(): Promise<void> {
    await this.userSelect.all(by.tagName('option')).last().click();
  }

  async userSelectOption(option: string): Promise<void> {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect(): ElementFinder {
    return this.userSelect;
  }

  async getUserSelectedOption(): Promise<string> {
    return await this.userSelect.element(by.css('option:checked')).getText();
  }

  async teachersSelectLastOption(): Promise<void> {
    await this.teachersSelect.all(by.tagName('option')).last().click();
  }

  async teachersSelectOption(option: string): Promise<void> {
    await this.teachersSelect.sendKeys(option);
  }

  getTeachersSelect(): ElementFinder {
    return this.teachersSelect;
  }

  async getTeachersSelectedOption(): Promise<string> {
    return await this.teachersSelect.element(by.css('option:checked')).getText();
  }

  async groupOfStudentsSelectLastOption(): Promise<void> {
    await this.groupOfStudentsSelect.all(by.tagName('option')).last().click();
  }

  async groupOfStudentsSelectOption(option: string): Promise<void> {
    await this.groupOfStudentsSelect.sendKeys(option);
  }

  getGroupOfStudentsSelect(): ElementFinder {
    return this.groupOfStudentsSelect;
  }

  async getGroupOfStudentsSelectedOption(): Promise<string> {
    return await this.groupOfStudentsSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class StudentsDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-students-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-students'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}

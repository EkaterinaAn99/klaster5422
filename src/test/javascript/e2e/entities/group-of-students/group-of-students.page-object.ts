import { element, by, ElementFinder } from 'protractor';

export class GroupOfStudentsComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-group-of-students div table .btn-danger'));
  title = element.all(by.css('jhi-group-of-students div h2#page-heading span')).first();
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

export class GroupOfStudentsUpdatePage {
  pageTitle = element(by.id('jhi-group-of-students-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameOfStudentsInput = element(by.id('field_nameOfStudents'));

  teachersSelect = element(by.id('field_teachers'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameOfStudentsInput(nameOfStudents: string): Promise<void> {
    await this.nameOfStudentsInput.sendKeys(nameOfStudents);
  }

  async getNameOfStudentsInput(): Promise<string> {
    return await this.nameOfStudentsInput.getAttribute('value');
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

export class GroupOfStudentsDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-groupOfStudents-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-groupOfStudents'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}

import { element, by, ElementFinder } from 'protractor';

export class ProgramsComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-programs div table .btn-danger'));
  title = element.all(by.css('jhi-programs div h2#page-heading span')).first();
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

export class ProgramsUpdatePage {
  pageTitle = element(by.id('jhi-programs-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  dateInput = element(by.id('field_date'));
  whoAddInput = element(by.id('field_whoAdd'));
  groupInput = element(by.id('field_group'));
  adressInput = element(by.id('field_adress'));

  studentsSelect = element(by.id('field_students'));
  groupOfStudentsSelect = element(by.id('field_groupOfStudents'));
  teachersSelect = element(by.id('field_teachers'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDateInput(date: string): Promise<void> {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput(): Promise<string> {
    return await this.dateInput.getAttribute('value');
  }

  async setWhoAddInput(whoAdd: string): Promise<void> {
    await this.whoAddInput.sendKeys(whoAdd);
  }

  async getWhoAddInput(): Promise<string> {
    return await this.whoAddInput.getAttribute('value');
  }

  async setGroupInput(group: string): Promise<void> {
    await this.groupInput.sendKeys(group);
  }

  async getGroupInput(): Promise<string> {
    return await this.groupInput.getAttribute('value');
  }

  async setAdressInput(adress: string): Promise<void> {
    await this.adressInput.sendKeys(adress);
  }

  async getAdressInput(): Promise<string> {
    return await this.adressInput.getAttribute('value');
  }

  async studentsSelectLastOption(): Promise<void> {
    await this.studentsSelect.all(by.tagName('option')).last().click();
  }

  async studentsSelectOption(option: string): Promise<void> {
    await this.studentsSelect.sendKeys(option);
  }

  getStudentsSelect(): ElementFinder {
    return this.studentsSelect;
  }

  async getStudentsSelectedOption(): Promise<string> {
    return await this.studentsSelect.element(by.css('option:checked')).getText();
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

export class ProgramsDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-programs-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-programs'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}

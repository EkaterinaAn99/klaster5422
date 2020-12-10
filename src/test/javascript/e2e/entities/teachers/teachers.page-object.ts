import { element, by, ElementFinder } from 'protractor';

export class TeachersComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-teachers div table .btn-danger'));
  title = element.all(by.css('jhi-teachers div h2#page-heading span')).first();
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

export class TeachersUpdatePage {
  pageTitle = element(by.id('jhi-teachers-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  surnameInput = element(by.id('field_surname'));
  middleNameInput = element(by.id('field_middleName'));
  typeInput = element(by.id('field_type'));

  userSelect = element(by.id('field_user'));

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

export class TeachersDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-teachers-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-teachers'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}

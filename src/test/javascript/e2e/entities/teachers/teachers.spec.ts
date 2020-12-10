import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TeachersComponentsPage, TeachersDeleteDialog, TeachersUpdatePage } from './teachers.page-object';

const expect = chai.expect;

describe('Teachers e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let teachersComponentsPage: TeachersComponentsPage;
  let teachersUpdatePage: TeachersUpdatePage;
  let teachersDeleteDialog: TeachersDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Teachers', async () => {
    await navBarPage.goToEntity('teachers');
    teachersComponentsPage = new TeachersComponentsPage();
    await browser.wait(ec.visibilityOf(teachersComponentsPage.title), 5000);
    expect(await teachersComponentsPage.getTitle()).to.eq('klaster5422App.teachers.home.title');
    await browser.wait(ec.or(ec.visibilityOf(teachersComponentsPage.entities), ec.visibilityOf(teachersComponentsPage.noResult)), 1000);
  });

  it('should load create Teachers page', async () => {
    await teachersComponentsPage.clickOnCreateButton();
    teachersUpdatePage = new TeachersUpdatePage();
    expect(await teachersUpdatePage.getPageTitle()).to.eq('klaster5422App.teachers.home.createOrEditLabel');
    await teachersUpdatePage.cancel();
  });

  it('should create and save Teachers', async () => {
    const nbButtonsBeforeCreate = await teachersComponentsPage.countDeleteButtons();

    await teachersComponentsPage.clickOnCreateButton();

    await promise.all([
      teachersUpdatePage.setNameInput('name'),
      teachersUpdatePage.setSurnameInput('surname'),
      teachersUpdatePage.setMiddleNameInput('middleName'),
      teachersUpdatePage.setTypeInput('type'),
      teachersUpdatePage.userSelectLastOption(),
    ]);

    expect(await teachersUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await teachersUpdatePage.getSurnameInput()).to.eq('surname', 'Expected Surname value to be equals to surname');
    expect(await teachersUpdatePage.getMiddleNameInput()).to.eq('middleName', 'Expected MiddleName value to be equals to middleName');
    expect(await teachersUpdatePage.getTypeInput()).to.eq('type', 'Expected Type value to be equals to type');

    await teachersUpdatePage.save();
    expect(await teachersUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await teachersComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Teachers', async () => {
    const nbButtonsBeforeDelete = await teachersComponentsPage.countDeleteButtons();
    await teachersComponentsPage.clickOnLastDeleteButton();

    teachersDeleteDialog = new TeachersDeleteDialog();
    expect(await teachersDeleteDialog.getDialogTitle()).to.eq('klaster5422App.teachers.delete.question');
    await teachersDeleteDialog.clickOnConfirmButton();

    expect(await teachersComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { StudentsComponentsPage, StudentsDeleteDialog, StudentsUpdatePage } from './students.page-object';

const expect = chai.expect;

describe('Students e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let studentsComponentsPage: StudentsComponentsPage;
  let studentsUpdatePage: StudentsUpdatePage;
  let studentsDeleteDialog: StudentsDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Students', async () => {
    await navBarPage.goToEntity('students');
    studentsComponentsPage = new StudentsComponentsPage();
    await browser.wait(ec.visibilityOf(studentsComponentsPage.title), 5000);
    expect(await studentsComponentsPage.getTitle()).to.eq('klaster5422App.students.home.title');
    await browser.wait(ec.or(ec.visibilityOf(studentsComponentsPage.entities), ec.visibilityOf(studentsComponentsPage.noResult)), 1000);
  });

  it('should load create Students page', async () => {
    await studentsComponentsPage.clickOnCreateButton();
    studentsUpdatePage = new StudentsUpdatePage();
    expect(await studentsUpdatePage.getPageTitle()).to.eq('klaster5422App.students.home.createOrEditLabel');
    await studentsUpdatePage.cancel();
  });

  it('should create and save Students', async () => {
    const nbButtonsBeforeCreate = await studentsComponentsPage.countDeleteButtons();

    await studentsComponentsPage.clickOnCreateButton();

    await promise.all([
      studentsUpdatePage.setNameInput('name'),
      studentsUpdatePage.setSurnameInput('surname'),
      studentsUpdatePage.setMiddleNameInput('middleName'),
      studentsUpdatePage.setGroupInput('group'),
      studentsUpdatePage.setTypeInput('type'),
      studentsUpdatePage.userSelectLastOption(),
      studentsUpdatePage.teachersSelectLastOption(),
      studentsUpdatePage.groupOfStudentsSelectLastOption(),
    ]);

    expect(await studentsUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await studentsUpdatePage.getSurnameInput()).to.eq('surname', 'Expected Surname value to be equals to surname');
    expect(await studentsUpdatePage.getMiddleNameInput()).to.eq('middleName', 'Expected MiddleName value to be equals to middleName');
    expect(await studentsUpdatePage.getGroupInput()).to.eq('group', 'Expected Group value to be equals to group');
    expect(await studentsUpdatePage.getTypeInput()).to.eq('type', 'Expected Type value to be equals to type');

    await studentsUpdatePage.save();
    expect(await studentsUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await studentsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Students', async () => {
    const nbButtonsBeforeDelete = await studentsComponentsPage.countDeleteButtons();
    await studentsComponentsPage.clickOnLastDeleteButton();

    studentsDeleteDialog = new StudentsDeleteDialog();
    expect(await studentsDeleteDialog.getDialogTitle()).to.eq('klaster5422App.students.delete.question');
    await studentsDeleteDialog.clickOnConfirmButton();

    expect(await studentsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

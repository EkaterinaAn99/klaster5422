import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GroupOfStudentsComponentsPage, GroupOfStudentsDeleteDialog, GroupOfStudentsUpdatePage } from './group-of-students.page-object';

const expect = chai.expect;

describe('GroupOfStudents e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let groupOfStudentsComponentsPage: GroupOfStudentsComponentsPage;
  let groupOfStudentsUpdatePage: GroupOfStudentsUpdatePage;
  let groupOfStudentsDeleteDialog: GroupOfStudentsDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load GroupOfStudents', async () => {
    await navBarPage.goToEntity('group-of-students');
    groupOfStudentsComponentsPage = new GroupOfStudentsComponentsPage();
    await browser.wait(ec.visibilityOf(groupOfStudentsComponentsPage.title), 5000);
    expect(await groupOfStudentsComponentsPage.getTitle()).to.eq('klaster5422App.groupOfStudents.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(groupOfStudentsComponentsPage.entities), ec.visibilityOf(groupOfStudentsComponentsPage.noResult)),
      1000
    );
  });

  it('should load create GroupOfStudents page', async () => {
    await groupOfStudentsComponentsPage.clickOnCreateButton();
    groupOfStudentsUpdatePage = new GroupOfStudentsUpdatePage();
    expect(await groupOfStudentsUpdatePage.getPageTitle()).to.eq('klaster5422App.groupOfStudents.home.createOrEditLabel');
    await groupOfStudentsUpdatePage.cancel();
  });

  it('should create and save GroupOfStudents', async () => {
    const nbButtonsBeforeCreate = await groupOfStudentsComponentsPage.countDeleteButtons();

    await groupOfStudentsComponentsPage.clickOnCreateButton();

    await promise.all([
      groupOfStudentsUpdatePage.setNameOfStudentsInput('nameOfStudents'),
      groupOfStudentsUpdatePage.teachersSelectLastOption(),
    ]);

    expect(await groupOfStudentsUpdatePage.getNameOfStudentsInput()).to.eq(
      'nameOfStudents',
      'Expected NameOfStudents value to be equals to nameOfStudents'
    );

    await groupOfStudentsUpdatePage.save();
    expect(await groupOfStudentsUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await groupOfStudentsComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last GroupOfStudents', async () => {
    const nbButtonsBeforeDelete = await groupOfStudentsComponentsPage.countDeleteButtons();
    await groupOfStudentsComponentsPage.clickOnLastDeleteButton();

    groupOfStudentsDeleteDialog = new GroupOfStudentsDeleteDialog();
    expect(await groupOfStudentsDeleteDialog.getDialogTitle()).to.eq('klaster5422App.groupOfStudents.delete.question');
    await groupOfStudentsDeleteDialog.clickOnConfirmButton();

    expect(await groupOfStudentsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

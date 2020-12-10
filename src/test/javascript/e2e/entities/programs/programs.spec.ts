import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProgramsComponentsPage, ProgramsDeleteDialog, ProgramsUpdatePage } from './programs.page-object';

const expect = chai.expect;

describe('Programs e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let programsComponentsPage: ProgramsComponentsPage;
  let programsUpdatePage: ProgramsUpdatePage;
  let programsDeleteDialog: ProgramsDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Programs', async () => {
    await navBarPage.goToEntity('programs');
    programsComponentsPage = new ProgramsComponentsPage();
    await browser.wait(ec.visibilityOf(programsComponentsPage.title), 5000);
    expect(await programsComponentsPage.getTitle()).to.eq('klaster5422App.programs.home.title');
    await browser.wait(ec.or(ec.visibilityOf(programsComponentsPage.entities), ec.visibilityOf(programsComponentsPage.noResult)), 1000);
  });

  it('should load create Programs page', async () => {
    await programsComponentsPage.clickOnCreateButton();
    programsUpdatePage = new ProgramsUpdatePage();
    expect(await programsUpdatePage.getPageTitle()).to.eq('klaster5422App.programs.home.createOrEditLabel');
    await programsUpdatePage.cancel();
  });

  it('should create and save Programs', async () => {
    const nbButtonsBeforeCreate = await programsComponentsPage.countDeleteButtons();

    await programsComponentsPage.clickOnCreateButton();

    await promise.all([
      programsUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      programsUpdatePage.setWhoAddInput('whoAdd'),
      programsUpdatePage.setGroupInput('group'),
      programsUpdatePage.setAdressInput('adress'),
      programsUpdatePage.studentsSelectLastOption(),
      programsUpdatePage.groupOfStudentsSelectLastOption(),
      programsUpdatePage.teachersSelectLastOption(),
    ]);

    expect(await programsUpdatePage.getDateInput()).to.contain('2001-01-01T02:30', 'Expected date value to be equals to 2000-12-31');
    expect(await programsUpdatePage.getWhoAddInput()).to.eq('whoAdd', 'Expected WhoAdd value to be equals to whoAdd');
    expect(await programsUpdatePage.getGroupInput()).to.eq('group', 'Expected Group value to be equals to group');
    expect(await programsUpdatePage.getAdressInput()).to.eq('adress', 'Expected Adress value to be equals to adress');

    await programsUpdatePage.save();
    expect(await programsUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await programsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Programs', async () => {
    const nbButtonsBeforeDelete = await programsComponentsPage.countDeleteButtons();
    await programsComponentsPage.clickOnLastDeleteButton();

    programsDeleteDialog = new ProgramsDeleteDialog();
    expect(await programsDeleteDialog.getDialogTitle()).to.eq('klaster5422App.programs.delete.question');
    await programsDeleteDialog.clickOnConfirmButton();

    expect(await programsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

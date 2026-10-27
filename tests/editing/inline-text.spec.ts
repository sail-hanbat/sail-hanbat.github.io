import { test, expect, startEditing, expectText, cancelEditing } from './fixtures';

test('typing, selection replacement and undo keep the caret in place', async ({ page, content }) => {
  await page.goto('/');
  const field = page.locator('.overview-copy > p');
  await expectText(field, content.pages.home.hero.description);
  await startEditing(page);
  await field.press('Control+End');
  await field.pressSequentially('boy');
  await expectText(field, 'I am a boy');
  await field.press('ArrowLeft');
  await field.press('ArrowLeft');
  await field.pressSequentially('abc');
  await expectText(field, 'I am a babcoy');
  for (let index = 0; index < 3; index++) await field.press('Shift+ArrowLeft');
  await field.pressSequentially('XYZ');
  await expectText(field, 'I am a bXYZoy');
  await field.press('Control+z');
  await expectText(field, 'I am a babcoy');
  await field.press('Control+Shift+z');
  await expectText(field, 'I am a bXYZoy');
  expect(content.writes).toHaveLength(0);
});

test('Enter, Shift+Enter, blank lines and rich multiline paste remain plain text', async ({ page, context, content }) => {
  await page.goto('/');
  const field = page.locator('.overview-copy > p');
  await expectText(field, content.pages.home.hero.description);
  await startEditing(page);
  await field.fill('First');
  await field.press('End');
  await field.press('Enter');
  await field.pressSequentially('Second');
  await field.press('Shift+Enter');
  await field.press('Enter');
  await field.pressSequentially('Fourth');
  await expectText(field, 'First\nSecond\n\nFourth');
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.evaluate(async () => {
    await navigator.clipboard.write([new ClipboardItem({
      'text/plain': new Blob(['Alpha\r\nBeta\n\nGamma'], { type: 'text/plain' }),
      'text/html': new Blob(['<b>Alpha</b><br>Beta<br><br>Gamma'], { type: 'text/html' }),
    })]);
  });
  await field.press('Control+a');
  await field.press('Control+v');
  await expectText(field, 'Alpha\nBeta\n\nGamma');
  await expect(field.locator('b')).toHaveCount(0);
  await field.pressSequentially('!');
  await expectText(field, 'Alpha\nBeta\n\nGamma!');
});

test('Save and reload preserve line breaks; Cancel discards unsaved edits', async ({ page, content }) => {
  await page.goto('/');
  const field = page.locator('.overview-copy > p');
  await expectText(field, content.pages.home.hero.description);
  await startEditing(page);
  const text = 'First line\nSecond line\n\nFourth line';
  await field.fill(text);
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Saved.');
  expect(content.pages.home.hero.description).toBe(text);
  await cancelEditing(page);
  await expectText(field, text);
  await expect(field).toHaveCSS('white-space', 'pre-wrap');
  await page.reload();
  await expectText(field, text);
  await page.getByRole('button', { name: 'Edit Page', exact: true }).click();
  await field.fill('Unsaved replacement');
  await cancelEditing(page);
  await expectText(field, text);
  expect(content.writes).toHaveLength(1);
});

test('composition is not reconciled or blurred before Korean input commits', async ({ page, content }) => {
  await page.goto('/');
  const field = page.locator('.overview-copy > p');
  await expectText(field, content.pages.home.hero.description);
  await startEditing(page);
  await field.fill('연구 ');
  await field.evaluate((element) => {
    element.dispatchEvent(new CompositionEvent('compositionstart', { bubbles: true }));
    const text = element.firstChild!;
    text.textContent = '연구 한';
    const selection = window.getSelection()!;
    selection.collapse(text, text.textContent.length);
    element.dispatchEvent(new InputEvent('input', { bubbles: true, data: '한', isComposing: true }));
    element.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Enter', isComposing: true }));
  });
  await expect(field).toBeFocused();
  await expectText(field, '연구 한');
  await field.dispatchEvent('compositionend', { data: '한' });
  await page.keyboard.insertText('글');
  await expectText(field, '연구 한글');
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Saved.');
  expect(content.pages.home.hero.description).toBe('연구 한글');
});

test('trailing Enter saves one newline and can be continued after re-entering edit mode', async ({ page, content }) => {
  await page.goto('/');
  const field = page.locator('.overview-copy > p');
  await expectText(field, content.pages.home.hero.description);
  await startEditing(page);
  await field.fill('First');
  await field.press('End');
  await field.press('Enter');
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Saved.');
  expect(content.pages.home.hero.description).toBe('First\n');
  await cancelEditing(page);
  await expectText(field, 'First\n');
  await page.getByRole('button', { name: 'Edit Page', exact: true }).click();
  await field.press('Control+End');
  await field.pressSequentially('Second');
  await expectText(field, 'First\nSecond');
});

test('Research titles and topics stay mounted; reorder, removal and addition sync correctly', async ({ page, content }) => {
  await page.goto('/research/');
  await startEditing(page);
  const tracks = page.locator('.research-track');
  const title = tracks.first().locator('h2');
  await title.fill('Research ');
  await title.press('End');
  await title.pressSequentially('abc');
  await expectText(title, 'Research abc');
  const topic = tracks.first().locator('li .cms-text').first();
  await topic.fill('Topic ');
  await topic.press('End');
  await topic.pressSequentially('abc');
  await expectText(topic, 'Topic abc');
  await tracks.first().getByRole('button', { name: 'Move down' }).click();
  await expectText(tracks.nth(1).locator('h2'), 'Research abc');
  await expectText(tracks.nth(1).locator('li .cms-text').first(), 'Topic abc');
  await tracks.nth(1).locator('li').first().getByRole('button', { name: 'Remove', exact: true }).click();
  await expect(tracks.nth(1)).not.toContainText('Topic abc');
  await page.getByRole('button', { name: 'Add research area' }).click();
  await expectText(tracks.last().locator('h2'), 'New Research Area');
  await cancelEditing(page);
  await expectText(tracks.first().locator('h2'), content.pages.research.tracks[0].title);
});

test('Professor entry edits, insert-at-top and reorder do not mix text between rows', async ({ page, content }) => {
  await page.goto('/members/professor/');
  await startEditing(page);
  const section = page.locator('.professor-section').first();
  const titles = section.locator('li > strong');
  await titles.first().fill('Degree ');
  await titles.first().press('End');
  await titles.first().pressSequentially('abc');
  await expectText(titles.first(), 'Degree abc');
  await section.getByRole('button', { name: 'Add entry' }).click();
  await expectText(titles.first(), 'New entry');
  await expectText(titles.nth(1), 'Degree abc');
  await section.locator('li').nth(1).getByRole('button', { name: 'Move up' }).click();
  await expectText(titles.first(), 'Degree abc');
  await section.locator('li').nth(1).getByRole('button', { name: 'Remove', exact: true }).click();
  await expect(titles).toHaveCount(content.pages.professor.education.length);
  await cancelEditing(page);
  await expectText(titles.first(), content.pages.professor.education[0].title);
});

test('publication authors retain newlines and name highlighting after Save', async ({ page, content }) => {
  await page.goto('/publications/domestic/');
  await startEditing(page);
  const authors = page.locator('.publication-authors').first();
  await authors.locator('.cms-text').fill('Jaesin Ahn\nHeechul Jung');
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Saved.');
  await cancelEditing(page);
  await expectText(authors, 'Jaesin Ahn\nHeechul Jung');
  await expect(authors).toHaveCSS('white-space', 'pre-wrap');
  await expect(authors.locator('strong')).toHaveText('Jaesin Ahn');
  expect(content.writes).toHaveLength(1);
});

test('Contact and footer single-line layouts still honor explicit line breaks', async ({ page, content }) => {
  await page.goto('/contact/');
  await startEditing(page);
  const address = page.locator('.contact-address-lines .cms-text').first();
  const footerName = page.locator('.footer-logo > span');
  await address.fill('Address line one\nAddress line two');
  await footerName.fill('Safe & Applied\nIntelligence Lab');
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Saved.');
  await cancelEditing(page);
  await expectText(address, 'Address line one\nAddress line two');
  await expectText(footerName, 'SAFE & APPLIED\nINTELLIGENCE LAB');
  await expect(address).toHaveCSS('white-space', /^pre/);
  await expect(footerName).toHaveCSS('white-space', /^pre/);
  expect(content.pages.contact.addressEn).toBe('Address line one\nAddress line two');
  expect(content.pages.global.footer.labName).toBe('Safe & Applied\nIntelligence Lab');
});

test('News title uses the same caret-safe editor and article preserves newlines and Markdown', async ({ page, content }) => {
  await page.goto('/activities/news/post/?slug=test-news');
  const title = page.locator('.news-article-header h1');
  await expectText(title, 'I am a ');
  await startEditing(page);
  await title.press('Control+End');
  await title.pressSequentially('boy');
  await expectText(title, 'I am a boy');
  await title.press('Enter');
  await title.pressSequentially('News');
  const body = '**First** line\nSecond line\n\n- One\n- Two';
  await page.getByRole('textbox', { name: 'News content' }).fill(body);
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Saved.');
  await cancelEditing(page);
  await expectText(title, 'I am a boy\nNews');
  await expectText(page.locator('.news-body p'), 'First line\nSecond line');
  await expect(page.locator('.news-body p')).toHaveCSS('white-space', 'pre-wrap');
  await expect(page.locator('.news-body strong')).toHaveText('First');
  await expect(page.locator('.news-body li')).toHaveText(['One', 'Two']);
  expect(content.writes).toHaveLength(1);
  await page.reload();
  await expectText(title, 'I am a boy\nNews');
  await expectText(page.locator('.news-body p'), 'First line\nSecond line');
  await page.goto('/activities/news/');
  await expectText(page.locator('.news-card h3').first(), 'I am a boy\nNews');
  await expect(page.locator('.news-card h3').first()).toHaveCSS('white-space', 'pre-wrap');
});

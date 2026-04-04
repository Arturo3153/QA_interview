import { test, Browser, Page, expect} from '@playwright/test';
import { SandboxPage } from './Pages/SandboxPage';

(async() => {
    let browser: Browser;
    let page: Page;

    let InputText = 'Displayed text';

    test.describe(`Tools of playwright used in a sandbox`, () => {
    //test.skip(browserName == 'chromium', 'Don't test in Chrome'); //Test can skip the use of a Chrome

        test('Click button with dinamic ID in the sandbox', async ({ page }) => {
           
            await test.step('Navigate to Sandbox',async () => {
                await page.goto ('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
           
            await test.step('Click button with dinamic ID', async() => {
                                
                const buttonIDDinamico = page.getByRole('button',{ name: 'Hacé click para generar un ID'});
                await buttonIDDinamico.click({ force:true });
                //await botonIDDinamico.dblclick();
                //await botonIDDinamico.click({button: 'right'});
                //await botonIDDinamico.click({modifiers: ['Shift']});
                //await botonIDDinamico.hover();
                await expect(page.getByText('OMG, aparezco después de 3')).toBeVisible();


            })
            
        })

        test('Fill a text field in sandbox', async({page}) => {

            await test.step('Navigate to Sandbox', async() => {
                await page.goto('');
            })

            await test.step('Input text in text field', async() => {
                await expect(page.getByRole('textbox', { name: 'Un aburrido texto' })).toBeEditable();
                await page.getByRole('textbox', { name: 'Un aburrido texto' }).fill(InputText);
               // await page.getByRole('textbox', { name: 'Un aburrido texto' }).press('Enter');
               await expect(page.getByRole('textbox', { name: 'Un aburrido texto' })).toHaveValue(InputText);
               
            })
        })

        
        test('Select an option in checkbox and use an object from another Script', async({page, browserName}) => {
           // test.skip(browserName == 'chromium', 'No and en Chrome todavía');

            await test.step('Navigate to sandbox', async() => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Select Pasta checkbox option', async() => {
                const sandbox = new SandboxPage(page);
                
                await sandbox.checkPasta();
                
                await expect(sandbox.pastaCheckbox, 'Checkbox is not selected').toBeChecked();
            })
        })

        test('Validate the options in check box are the expected in the sandbox', async({page}) => {

            await test.step('Navigate to Sandbox', async() => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Validate all the expected options are in checkbox', async() => {
                await expect.soft(page.getByRole('checkbox', { name: 'Pizzaa 🍕' }),'Element Pizza 🍕 is not found').toBeVisible();
                await expect.soft(page.getByRole('checkbox', { name: 'Hamburguesa 🍔' })).toBeVisible();
                await expect.soft(page.getByRole('checkbox', { name: 'Pasta 🍝' })).toBeVisible();
                await expect.soft(page.getByRole('checkbox', { name: 'Heldo 🍧' }),'Elemento Helado 🍧 is not found').toBeVisible(); //expect fails on purpose
                await expect.soft(page.getByRole('checkbox', { name: 'Torta 🍰' })).toBeVisible();
                
            })
        })

        

        test('Unselect a checkbox', async({page}) => {

            await test.step('Navigate to sandbox', async() => {
                await page.goto('');
            })

            await test.step('Puedo seleccionar el checkbox para Pasta', async() => {
                await page.getByRole('checkbox', { name: 'Pasta 🍝' }).check();
                await page.getByRole('checkbox', { name: 'Pasta 🍝' }).uncheck();
                await expect(page.getByRole('checkbox', { name: 'Pasta 🍝' })).not.toBeChecked();
            })
        })

        test('Select radio buttons', async({page}) => {

            await test.step('Navigate to Sandbox', async() => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

                await test.step('Select a radio button option', async() => {
                await page.getByRole('radio', { name: 'No' }).check();
                await expect(page.getByRole('radio', { name: 'No' }), 'Radio button is not selected').toBeChecked();
            })
        })

        test('Dropdown items are the expected ones', async({page}) => {

            await test.step('Navigate to sandbox', async() => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Validate that sports in the dropdown are the expected', async() => {
                const sports = ['Fútbol', 'Tennis', 'Basketball'] //expected sports

                for (let option of sports) {
                    const elemento = await page.$(`select#formBasicSelect > option:is(:text("${option}"))`)
                    if(elemento){
                        console.log(`Option '${option}' is in the list`);
                    } else {
                        throw new Error(`Opcion '${option}' is not in the list`);
                    }
                }
            })
        })

        test('Select a dropdown option ', async({page}) => {

            await test.step('Dado que navego al Snabox de Automation de Free RAnge Testers', async() => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Puedo seleccionar opcion', async() => {
                await page.getByLabel('Dropdown').selectOption('Fútbol');
            })
        })

        test('Select an option in a different dropdown list', async({page}) => {

            test.info().annotations.push( {
                type: 'bug',
                description : 'Information of defect detected'
            });
            
            await test.step('Navigate to sandbox', async() => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Select a day in the dropdown', async() => {
                await page.getByRole('button', { name: 'Día de la semana' }).click(); //this dropdown doesn't allow .selectOption
                await page.getByRole('link', { name: 'Martes' }).click();
            })
        })

        test('Load files to sandbox', async({page}) => { //a hypothetical test
            
            await test.step('Navigate to sandbox', async() => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            }) 

            await test.step('Drag option', async() => {
                //await page.getByLabel('Upload file').setInputFiles(['archivo.pdf','invoice.pdf']); // selecciona archivos
                //await page.getByLabel('Upload file').setInputFiles([]); // quitar archivos
            })
        })

        test('Capacity to drag and drop', async({page}) => { //hypothetical test

            await test.step('Navigate to sandbox', async() => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Select an option', async() => {
                //await page.getByTestId('DragFrom').dragTo((page).getByTestId('DragTo')); para seleccionar y arrastrar algo
            })
        })

        test('Validate a static column of a table', async({page}) => {

            await test.info().attach('screenshot', { //to make a screenshot
                body: await page.screenshot(),
                contentType: 'image/png'
            });

            await test.step('Navigate to sandbox', async() => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Validate elements of a colum in a static table', async() => {
                const ValueColumNames = await page.$$eval('h2:has-text("Tabla estática") + table tbody tr td:nth-child(2)', elements => elements.map(element => element.textContent));
                const expectNAmes = ['Messi', 'Ronaldo', 'Mbappe'];
                
            //Take screenshot and add it to project
                await test.info().attach('screenshot', {
                    body: await page.screenshot(),
                    contentType: 'image/png',
                })

                expect(ValueColumNames).toEqual(expectNAmes);
            })
            
        })

        test('Validate dinamic table', async({page}) => {

            await test.step('Navigate to sandbox', async() => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Validate values change in the dinamic table', async() => {
                // Array with values of the dinamic table
                const DinamicTableValues = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td:nth-child(2)', elements => elements.map(element => element.textContent));
                console.log(DinamicTableValues);

                //Reload of the page and the values
                await page.reload();

                const PostReloadValues = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td:nth-child(2)', elements => elements.map(element => element.textContent));
                console.log(DinamicTableValues)

                //Validate values changed in each cell
                expect(DinamicTableValues).not.toEqual(PostReloadValues);
            })
            
        })

        test('Pop up validation', async({page}) => {

            await test.step('Navigate to sandbox', async() => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Click a button and then a pop up appears', async ( )=> {
                await page.getByRole('button', { name: 'Mostrar popup' }).click();
               
            })

            await test.step('Validate element from a Pop-up', async() => {
                await expect(page.getByText('¿Viste? ¡Apareció un Pop-up!')).toHaveText('¿Viste? ¡Apareció un Pop-up!');
                await page.getByRole('button', { name: 'Cerrar' }).click();

            })
        })

        
    })

})();

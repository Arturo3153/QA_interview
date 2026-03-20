import { test, Browser, Page, expect} from '@playwright/test';
import { SandboxPage } from './Pages/SandboxPage';

(async() => {
    let browser: Browser;
    let page: Page;

    let textoAEscribir = 'Estoy aprendiendo Playwright';

    test.describe(`Acciones en el Automation Sandbox`, () => {
    //test.skip(browserName == 'chromium', 'No and en Chrome todavía');

        test('Click en Botón ID Dinámico', async ({ page }) => {
           
            await test.step('Dado que navego al sandbox de Automation',async () => {
                await page.goto ('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
           
            await test.step('Puedo hacer click en el botón con ID dinámico', async() => {
                await page.getByRole('button',{ name: 'Hacé click para generar un ID'}).click();
                
                const botonIDDinamico = page.getByRole('button',{ name: 'Hacé click para generar un ID'});
                await botonIDDinamico.click({ force:true });
                //await botonIDDinamico.dblclick();
                //await botonIDDinamico.click({button: 'right'});
                //await botonIDDinamico.click({modifiers: ['Shift']});
                //await botonIDDinamico.hover();
                await expect(page.getByText('OMG, aparezco después de 3')).toBeVisible();


            })
            
        })

        test('Lleno un campo de texto en Automation @Sandbox', async({page}) => {

            await test.step('Dado que navego al Snabox de Automation de Free RAnge Testers', async() => {
                await page.goto('');
            })

            await test.step('Puedo ingresar texto en el campo', async() => {
                await expect(page.getByRole('textbox', { name: 'Un aburrido texto' })).toBeEditable();
                await page.getByRole('textbox', { name: 'Un aburrido texto' }).fill(textoAEscribir);
               // await page.getByRole('textbox', { name: 'Un aburrido texto' }).press('Enter');
               await expect(page.getByRole('textbox', { name: 'Un aburrido texto' })).toHaveValue(textoAEscribir);
               
            })
        })

        test('Para validar el check box tiene todas las opciones esperadas en el @Sandbox', async({page}) => {

            await test.step('Dado que navego al Snabox de Automation de Free RAnge Testers', async() => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Puedo seleccionar el checkbox para Pasta', async() => {
                await expect.soft(page.getByRole('checkbox', { name: 'Pizzaa 🍕' }),'No se encontró el elemento Pizza 🍕').toBeVisible();
                await expect.soft(page.getByRole('checkbox', { name: 'Hamburguesa 🍔' })).toBeVisible();
                await expect.soft(page.getByRole('checkbox', { name: 'Pasta 🍝' })).toBeVisible();
                await expect.soft(page.getByRole('checkbox', { name: 'Heldo 🍧' }),'No se encontró el elemento Helado 🍧').toBeVisible();
                await expect.soft(page.getByRole('checkbox', { name: 'Torta 🍰' })).toBeVisible();
                
            })
        })

        test('Para seleccionar checkbox eb el @Sandbox', async({page, browserName}) => {
           // test.skip(browserName == 'chromium', 'No and en Chrome todavía');

            await test.step('Dado que navego al Snabox de Automation de Free RAnge Testers', async() => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Puedo seleccionar el checkbox para Pasta', async() => {
                const sandbox = new SandboxPage(page);
                
                await sandbox.checkPasta();
                
                await expect(sandbox.pastaCheckbox, 'El checkbox no esta seleccionado').toBeChecked();
            })
        })

        test('Para deseleccionar checkbox', async({page}) => {

            await test.step('Dado que navego al Snabox de Automation de Free RAnge Testers', async() => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Puedo seleccionar el checkbox para Pasta', async() => {
                await page.getByRole('checkbox', { name: 'Pasta 🍝' }).check();
                await page.getByRole('checkbox', { name: 'Pasta 🍝' }).uncheck();
                await expect(page.getByRole('checkbox', { name: 'Pasta 🍝' })).not.toBeChecked();
            })
        })

        test('Seleccionar radio buttons', async({page}) => {

            await test.step('Dado que navego al Snabox de Automation de Free RAnge Testers', async() => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Puedo seleccionar una opción del radio button', async() => {
                await page.getByRole('radio', { name: 'No' }).check();
                await expect(page.getByRole('radio', { name: 'No' }), 'El radio button no se seleccionó').toBeChecked();
            })
        })

        test('Los items del dropdown son los esperados', async({page}) => {

            await test.step('Dado que navego al Snabox de Automation de Free RAnge Testers', async() => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Valido que la lista del dropdown contiene los deportes esperados', async() => {
                const deportes = ['Fútbol', 'Tennis', 'Basketball', 'Bochas']

                for (let opcion of deportes) {
                    const elemento = await page.$(`select#formBasicSelect > option:is(:text("${opcion}"))`)
                    if(elemento){
                        console.log(`Opción '${opcion}' presente en la lista`);
                    } else {
                        throw new Error(`Opcion '${opcion}' no presente en la lista`);
                    }
                }
            })
        })

        test('Seleccionar dropdown', async({page}) => {

            await test.step('Dado que navego al Snabox de Automation de Free RAnge Testers', async() => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Puedo seleccionar opcion', async() => {
                await page.getByLabel('Dropdown').selectOption('Fútbol');
            })
        })

        test('Seleccionar día de la semana', async({page}) => {

            test.info().annotations.push( {
                type: 'bug',
                description : 'Esto va a informar que el caso de prueba tiene un bug'
            });
            
            await test.step('Dado que navego al Snabox de Automation de Free RAnge Testers', async() => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Puedo seleccionar un día', async() => {
                await page.getByRole('button', { name: 'Día de la semana' }).click();
                await page.getByRole('link', { name: 'Martes' }).click();
            })
        })

        test('Puedo subir archivos a Automation Sandbox', async({page}) => {
            
            await test.step('Dado que navego al Snabox de Automation de Free RAnge Testers', async() => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            }) 

            await test.step('Seleccionar un drag', async() => {
                //await page.getByLabel('Upload file').setInputFiles(['archivo.pdf','invoice.pdf']); // selecciona archivos
                //await page.getByLabel('Upload file').setInputFiles([]); // quitar archivos
            })
        })

        test('Puedo hacer drag and drop', async({page}) => {

            await test.step('Dado que navego al Snabox de Automation de Free RAnge Testers', async() => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Puedo seleccionar opcion', async() => {
                //await page.getByTestId('DragFrom').dragTo((page).getByTestId('DragTo')); para seleccionar y arrastrar algo
            })
        })

        test('Validando la columna Nombres de la tabla estática', async({page}) => {

            await test.info().attach('screenshot', {
                body: await page.screenshot(),
                contentType: 'image/png'
            });

            await test.step('Dado que navego al Snabox de Automation de Free RAnge Testers', async() => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Puedo validar los elementos para la columna NOmbre de la tabla estática', async() => {
                const valoresColumnaNombres = await page.$$eval('h2:has-text("Tabla estática") + table tbody tr td:nth-child(2)', elements => elements.map(element => element.textContent));
                const nombresEsperados = ['Messi', 'Ronaldo', 'Mbappe'];
                
            //Saca una screen y la adjunta aunque el caso pase.
                await test.info().attach('screenshot', {
                    body: await page.screenshot(),
                    contentType: 'image/png',
                })

                expect(valoresColumnaNombres).toEqual(nombresEsperados);
            })
            
        })

        test('Validando de la tabla dinámica', async({page}) => {

            await test.step('Dado que navego al Snabox de Automation de Free RAnge Testers', async() => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Valido que los valores cambiaron al hacer un reload a la web', async() => {
                // Creamos un arreglo con todos los valores de la tabal dinámica
                const valoresTablaDinamica = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td:nth-child(2)', elements => elements.map(element => element.textContent));
                console.log(valoresTablaDinamica);

                //HAcemos una recarga para que cambien los valores
                await page.reload();

                const valoresPostReload = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td:nth-child(2)', elements => elements.map(element => element.textContent));
                console.log(valoresTablaDinamica)

                //Validamos que todos los valores cambiaron para cada celda
                expect(valoresTablaDinamica).not.toEqual(valoresPostReload);
            })
            
        })

        test('Validando dentro de un Popup', async({page}) => {

            await test.step('Dado que navego al Snabox de Automation de Free RAnge Testers', async() => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Cuando hago click en el botón popup', async ( )=> {
                await page.getByRole('button', { name: 'Mostrar popup' }).click();
               
            })

            await test.step('Puedo validar un elemento dentro del pop up', async() => {
                await expect(page.getByText('¿Viste? ¡Apareció un Pop-up!')).toHaveText('¿Viste? ¡Apareció un Pop-up!');
                await page.getByRole('button', { name: 'Cerrar' }).click();

            })
        })

        
    })

})();

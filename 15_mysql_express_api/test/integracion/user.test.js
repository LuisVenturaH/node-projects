test("Obtiene 400 al registrar un usuario sin datos", async () => {
    const respuesta = await fetch('http://localhost:3000/user', { 
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
});

    console.log(respuesta.status)
    expect(respuesta.status).toBe(400);

    // const json = await respuesta.json()

    // expect(json.lenght).toBe(10)

    // for (let i = 0; i < json.lenght; i++) {
    //     expect(json[i].url).not.toBe(undefined)
    // }
    
})

test('Obtiene un 409 si existe un usuario ya creado', async () => {
    const respuesta = await fetch('http://localhost:3000/user', { 
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' },
        body: JSON.stringify({name: 'seis', surname: "seis", email: 'seis@seis.com', password: '1234'})
    });
    expect(respuesta.status).toBe(409)
})

test('Obtiene un 200 si el usuario se crea correctamente', async () => {
    const respuesta = await fetch('http://localhost:3000/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: 'pepe', surname: "pepe", email: 'pepe@seis.com', password: '1234'})
    })
    
    expect(respuesta.status).toBe(200)

    
})
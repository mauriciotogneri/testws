class Game
{
    constructor()
    {
        new Level()

        this.setupPlayers()

        physics.start()
    }

    setupPlayers()
    {
        const playerType = 1//prompt()

        if (playerType == "1")
        {
            this.playerLocal  = new SoldierLocal(600, 400, COLOR.blue)
            this.playerRemote = new SoldierRemote(200, 400, COLOR.red)
        }
        else
        {
            this.playerLocal  = new SoldierLocal(200, 400, COLOR.red)
            this.playerRemote = new SoldierRemote(600, 400, COLOR.blue)
        }
    }

    processMouseInput(input)
    {
        if (this.playerLocal)
        {
            this.playerLocal.processMouseInput(input)
        }
    }

    processMouseClick(pressed)
    {
        if (this.playerLocal)
        {
            this.playerLocal.processMouseClick(pressed)
        }
    }

    processKeyboardInput(input)
    {
        if (this.playerLocal)
        {
            this.playerLocal.processKeyboardInput(input)
        }
    }

    processStringMessage(data)
    {
        console.log(data)
    }

    processBinaryMessage(operation, binary)
    {
        if (this.playerRemote)
        {
            if (operation == API_OPERATION.newPosition)
            {
                this.playerRemote.processNewPosition(binary)
            }
            else if (operation == API_OPERATION.newBullet)
            {
                const data = Api.newBullet.receive(binary)

                new Bullet(data.x, data.y, data.angle)
            }
        }
    }

    update(delta)
    {
        this.playerLocal.update(delta)
        this.playerRemote.update(delta)

        display.update(physics.engine.world.bodies)
    }
}
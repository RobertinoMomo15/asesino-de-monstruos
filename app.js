new Vue({
    el: '#app',
    data: {
        saludJugador: 100,
        saludMonstruo: 100,
        hayUnaPartidaEnJuego: false,
        turnos: [], //es para registrar los eventos de la partida
        esJugador: false,
        rangoAtaque: [3, 10],
        rangoAtaqueEspecial: [10, 20],
        rangoAtaqueDelMonstruo: [5, 12],
    },

    methods: {
        getSalud(salud) {
            return `${salud}%`
        },
        empezarPartida: function () {
            this.turnos = []
            this.hayUnaPartidaEnJuego = true
            this.saludJugador = 100
            this.saludMonstruo = 100

        },
        atacar: function () {
            
            var danio = this.calcularHeridas(this.rangoAtaque)
            this.saludMonstruo -= danio
            
            this.registrarEvento({
                esJugador:true,
                text:'Golpeas al monstruo por ' + danio
            }) 

            if(this.verificarGanador()){
                return
            }

            this.ataqueDelMonstruo()

        },

        ataqueEspecial: function () {
            
            var danio = this.calcularHeridas(this.rangoAtaqueEspecial)
            this.saludMonstruo -= danio

            this.registrarEvento({
                esJugador:true,
                text:'Golpeas fuerte al monstruo por ' + danio
            }) 

            if(this.verificarGanador()){
                return
            }

            this.ataqueDelMonstruo()
        },

        curar: function () {
            if(this.saludJugador > 90){
                this.saludJugador = 100
                
                this.registrarEvento({
                    esJugador:true,
                    text:'Estas con toda la vida'
                }) 
            
            }else{
                this.saludJugador += 10
                
                this.turnos.unshift({
                    esJugador:true,
                    text:'Te curaste por 10 puntos'
                })
                this.registrarEvento({
                    esJugador:true,
                    text:'Te curaste por 10 puntos'
                }) 
            }
            
            this.ataqueDelMonstruo()
        },

        registrarEvento(evento) {
            
            this.turnos.unshift(evento)

        },
        terminarPartida: function () {

            this.hayUnaPartidaEnJuego = false
        },

        ataqueDelMonstruo: function () {
            var danio = this.calcularHeridas(this.rangoAtaqueDelMonstruo)
            this.saludJugador -= danio

            this.registrarEvento({
                esJugador:false,
                text:'El monstruo te golpea por ' + danio
            }) 

            this.verificarGanador()

        },

        calcularHeridas: function (rango) {

            return Math.trunc(Math.random() * ((rango[1] + 1) - rango[0]) + rango[0]);

        },
        verificarGanador: function () {
            if(this.saludMonstruo <= 0){
                if(confirm('Ganaste. Jugar otra vez?')){
                    this.empezarPartida()
                }else{
                    this.hayUnaPartidaEnJuego = false
                }
                return true
            }else if(this.saludJugador <=0){
                if(confirm('Perdiste. Jugar otra vez?')){
                    this.empezarPartida()
                }else{
                    this.hayUnaPartidaEnJuego = false
                }
                return true
            }
            
            return false;
        },
        cssEvento(turno) {
            //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
            return {
                'player-turno': turno.esJugador,
                'monster-turno': !turno.esJugador
            }
        }
    }
});
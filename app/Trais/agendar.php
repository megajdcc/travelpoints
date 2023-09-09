<?php
namespace App\Trais;

use App\Models\Reunion;
use Illuminate\Database\Eloquent\Model;
use App\Models\Negocio\Reservacion;
use App\Models\{Destino,Atraccion};
use App\Models\Evento;
use App\Models\Negocio\Cupon;
use App\Notifications\RecordarReunion;
use Carbon\Carbon;

trait agendar
{
  

  public function agregarRecordatorio(Model $modelo){

    $new_reunion = [
      'titulo' => "",
      'descripcion' => '',
      'usuario_id' => $this->id,
      'model_id' => $modelo->id,
      'model_type' => $modelo->model_type,
      'fecha_inicio' => null,
      'fecha_fin' => null,
      'status' => 1, // 1 > activo 2 => vencido 3 => prorrateado,
      'recurrente' => false,
      'recurrencia' => [ 
            'dia_semana' => [],
            'hora_inicio' => null,
            'hora_fin' => null,
            'id_group' => null
          ],
      'all_dia' => false,
      'tipo_recurrencia' => 1,
      'archivo' => null,
      'nota' => null,
      'estado' => 1, // 0 => sin confirmar, 1 =>confirmada,2 => cancelada
      'participantes' => null, // [nombre,telefono,mail]
      'recordatorio' => null, // [telefono,email,participantes,nota]
      'tipo' => 1, // [1 => recordatorio, 2 => tarea, 3 => evento]
    ];

    if($modelo instanceof Reservacion){
      $fecha = date('Y-m-d',strtotime($modelo->fecha));
      $reunion = Reunion::create([
          ...$new_reunion,
          ...[
            'titulo' => "Reservación en el Negocio ({$modelo->negocio->nombre})",
            'descripcion' => "Reservación en el Negocio ({$modelo->negocio->nombre}), con la siguiente observación: {$modelo->observacion}",
            'fecha_inicio' => "{$fecha} {$modelo->hora}",
            'recordatorio' => ['telefono' => null,'email' => $this->email,'participantes' => false,'nota' => "Recordatorio: Tienes una reserva en el negocio {$modelo->negocio->nombre}"]
          ]
        ]);
        $delay1 = (new Carbon($reunion->fecha_inicio))->subDay();
        $delay2 = (new Carbon($reunion->fecha_inicio))->subHours(5);
        $delay3 = (new Carbon($reunion->fecha_inicio))->subMinutes(30);

        $this->notify((new RecordarReunion($reunion))->delay($delay1)); // se informa un día anterior
        $this->notify((new RecordarReunion($reunion))->delay($delay2)); // se informa 5 horas antes de la reserva
        $this->notify((new RecordarReunion($reunion))->delay($delay3)); // se informa 30 min antes 

    }

  }



  public function recordarme(Reunion $reunion){
    $delay1 = (new Carbon($reunion->fecha_inicio))->subDay();
    $delay2 = (new Carbon($reunion->fecha_inicio))->subHours(5);
    $delay3 = (new Carbon($reunion->fecha_inicio))->subMinutes(30);
    // $this->notify((new RecordarReunion($reunion))); // Recordar ahora mismo
    $this->notify((new RecordarReunion($reunion))->delay($delay1)); // se informa un día anterior
    $this->notify((new RecordarReunion($reunion))->delay($delay2)); // se informa 5 horas antes de la reserva
    $this->notify((new RecordarReunion($reunion))->delay($delay3)); // se informa 30 min antes 
  }
  

}

package be.cgi.app.participant.controller

import be.cgi.app.common.controller.BaseController
import be.cgi.app.common.model.Point
import be.cgi.app.event.dao.EventDAO
import be.cgi.app.participant.model.Participant
import be.cgi.app.participant.validation.ParticipantCommand
import org.bson.types.ObjectId
import org.scalatra.swagger.Swagger
import com.novus.salat.grater
import be.cgi.context._

/**
 * Created by nick on 9/17/15.
 */
class ParticipantController(implicit val swagger: Swagger) extends BaseController {

  protected val applicationDescription = "All the end-points for Participant"

  val registerParticipant = apiOperation[Participant]("registerParticipant") summary "Register a new participant"
  post(operation(registerParticipant)) {
    if (command[ParticipantCommand].isValid) {
      val participant = grater[Participant].fromJSON(request.body)
      if (pointAvailable(participant.eventId, participant.point)) {
        // TODO complete the code
        "Point is available"
      }
    } else {
      halt(400, "Invalid data")
    }
  }

  def pointAvailable(eventId: ObjectId, point: Point): Boolean = {
    new EventDAO().findOneById(eventId) match {
      case Some(e) => !e.pointsTaken.contains(point)
      case None => false
    }
  }
}

package be.cgi.app.participant.validation

import be.cgi.app.common.model.Point
import be.cgi.app.common.validation.BaseCommand
import org.bson.types.ObjectId
import org.scalatra.commands._

/**
 * Created by nick on 9/17/15.
 */
class ParticipantCommand extends BaseCommand {
  // TODO
  //val eventId: Field[ObjectId] = asType[ObjectId]("eventId").validateObjectId()
  //val point: Field[Point] = asType[Point]("point").required
  val firstName: Field[String] = asType[String]("firstName").required.notBlank
  val lastName: Field[String] = asType[String]("lastName").required.notBlank
}

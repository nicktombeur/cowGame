package be.cgi.app.event.controller

import be.cgi.app.common.controller.BaseController
import be.cgi.app.event.dao.EventDAO
import be.cgi.app.event.model.Event
import com.mongodb.casbah.Imports._
import com.mongodb.casbah.commons.MongoDBObject
import org.scalatra.swagger._
import com.novus.salat.grater
import be.cgi.context._

/**
 * Created by nick on 7/10/15.
 */
class EventController(implicit val swagger: Swagger) extends BaseController {

  protected val applicationDescription = "All the end-points for event"

  val getEvents = (apiOperation[List[Event]]("getEvents")
    summary "Get all the events")
  get(operation(getEvents)) {
    grater[Event].toJSONArray(new EventDAO().find(MongoDBObject.empty).toList)
  }

  val createEvent = (apiOperation[ObjectId]("createEvent")
    summary "Create a new event")
  post(operation(createEvent)) {
    val insert: Option[ObjectId] = new EventDAO().insert(parsedBody.extract[Event])
    insert match {
      case Some(_) => insert
      case None => halt(500) // Or an other http status
    }
  }
}

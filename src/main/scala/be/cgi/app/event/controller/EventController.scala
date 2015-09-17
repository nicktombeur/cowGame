package be.cgi.app.event.controller

import be.cgi.app.common.controller.BaseController
import be.cgi.app.event.dao.EventDAO
import be.cgi.app.event.model.Event
import be.cgi.app.event.validation.EventCommand
import com.mongodb.casbah.commons.MongoDBObject
import org.bson.types.ObjectId
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

  val getEvent = apiOperation[Event]("getEventById") summary "Get an event by its id"
  get("/:id", operation(getEvent)) {
    params.get("id") match {
      case Some(id) =>
        try {
          new EventDAO().findOneById(new ObjectId(id)) match {
            case Some(e) => grater[Event].toJSON(e)
            case None => halt(404)
          }
        } catch {
          case e: IllegalArgumentException => halt(400)
        }
      case None => halt(400)
    }
  }

  val createEvent = (apiOperation[Event]("createEvent")
    summary "Create a new event")
  post(operation(createEvent)) {
    if (command[EventCommand].isValid) {
      val insert: Option[ObjectId] = new EventDAO().insert(parsedBody.extract[Event])
      insert match {
        case Some(_) => insert
        case None => halt(500)
      }
    } else {
      halt(400, "Invalid data")
    }
  }
}

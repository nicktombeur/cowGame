package be.cgi.app.event.dao

import be.cgi.app.CowGame
import be.cgi.app.event.model.Event
import com.novus.salat.dao.SalatDAO
import com.mongodb.casbah.Imports._
import be.cgi.context._
import org.bson.types.ObjectId

/**
 * Created by nick on 7/10/15.
 */
class EventDAO extends SalatDAO[Event, ObjectId] (collection = MongoConnection()(CowGame.DbName)(CowGame.EventCol))

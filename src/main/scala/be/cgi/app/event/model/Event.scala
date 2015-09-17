package be.cgi.app.event.model

import be.cgi.app.common.model.Point
import com.mongodb.casbah.Imports._
import org.joda.time.DateTime

/**
 * Created by nick on 7/10/15.
 */
case class Event(_id: ObjectId = new ObjectId, name: String, maxX: Int, maxY: Int, pointsTaken: List[Point])

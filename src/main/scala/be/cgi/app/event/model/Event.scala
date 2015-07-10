package be.cgi.app.event.model

import com.mongodb.casbah.Imports._

/**
 * Created by nick on 7/10/15.
 */
case class Event(_id: ObjectId = new ObjectId,
                 name: String)

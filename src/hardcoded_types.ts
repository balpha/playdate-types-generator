export const HARDCODED_TYPES: { [s: string]: { [k: string]: string | null } } =
  {
    "playdate.argv": {
      __value: "string[]",
    },
    "playdate.timer.value": {
      __value: "number",
    },
    "playdate.timer.easingAmplitude": {
      __value: "number",
    },
    "playdate.timer.easingPeriod": {
      __value: "number",
    },
    "playdate.timer.timerEndedArgs": {
      __value: "any[]",
    },
    "playdate.frameTimer.value": {
      __value: "number",
    },
    "playdate.frameTimer.easingAmplitude": {
      __value: "number",
    },
    "playdate.frameTimer.easingPeriod": {
      __value: "number",
    },
    "playdate.frameTimer.frame": {
      __value: "number",
    },
    "playdate.frameTimer.timerEndedArgs": {
      __value: "any[]",
    },
    "playdate.graphics.animator.easingAmplitude": {
      __value: "number",
    },
    "playdate.graphics.animator.easingPeriod": {
      __value: "number",
    },
    "playdate.graphics.animator.reverses": {
      __value: "boolean",
    },
    "playdate.sound.controlsignal.events": {
      __value: "pd_event[]",
    },
    "playdate.ui.crankIndicator.clockwise": {
      __value: "boolean",
    },
    "playdate.ui.gridview.easingAmplitude": {
      __value: "number",
    },
    "playdate.ui.gridview.easingPeriod": {
      __value: "number",
    },
    "playdate.getSystemMenu": {
      __return: "pd_menu",
    },
    "playdate.graphics.lockFocus": {
      __return: null,
    },
    "table.indexOfElement": {
      __return: "number?",
      table: "table",
    },
    "table.getsize": {
      __return: "(number, number)",
      table: "table",
    },
    "table.shallowcopy": {
      source: "table",
      destination: "table",
      __return: "table",
    },
    "table.deepcopy": {
      source: "table",
      __return: "table",
    },
    "playdate.getTime": {
      __return: "pd_time_table",
    },
    "playdate.getGMTTime": {
      __return: "pd_time_table",
    },
    "playdate.epochFromTime": {
      time: "pd_time_table",
    },
    "playdate.epochFromGMTTime": {
      time: "pd_time_table",
    },
    "playdate.timeFromEpoch": {
      __return: "pd_time_table",
    },
    "playdate.GMTTimeFromEpoch": {
      __return: "pd_time_table",
    },
    "table.create": {
      __return: "table",
    },
    "playdate.apiVersion": {
      __return: "(number, number)",
    },
    "playdate.setMenuImage": {
      xOffset: "number",
    },
    "playdate.getSystemLanguage": {
      __return: "pd_language",
    },
    "playdate.readAccelerometer": {
      __return: "(number, number, number)",
    },
    "playdate.getButtonState": {
      __return: "(integer, integer, integer)",
    },
    "playdate.getCrankPosition": {
      __return: "number",
    },
    "playdate.getCrankChange": {
      __return: "(number, number)",
    },
    "playdate.getCrankTicks": {
      ticksPerRevolution: "number",
    },
    "playdate.cranked": {
      change: "number",
      acceleratedChange: "number",
    },
    "playdate.getFPS": {
      __return: "number",
    },
    "playdate.getBatteryPercentage": {
      __return: "number",
    },
    "playdate.getBatteryVoltage": {
      __return: "number",
    },
    "playdate.setDebugDrawColor": {
      r: "number",
      g: "number",
      b: "number",
      a: "number",
    },
    "playdate.keyPressed": {
      key: "string",
    },
    "playdate.keyReleased": {
      key: "string",
    },
    "playdate.menu:addCheckmarkMenuItem": {
      __return: "pd_item",
      callback: "fun(boolean)",
    },
    "playdate.menu:addOptionsMenuItem": {
      options: "string[]",
      initalValue: "string",
      __return: "pd_item",
      callback: "fun(string)",
    },
    "playdate.menu:getMenuItems": {
      __return: "pd_item[]",
    },
    "playdate.menu:removeMenuItem": {
      menuItem: "pd_item",
    },
    "playdate.menu.item:setValue": {
      newValue: "integer|boolean|string",
    },
    "playdate.menu.item:getValue": {
      __return: "integer|boolean|string",
    },
    "playdate.inputHandlers.push": {
      handler: "pd_input_handler",
      masksPreviousHandlers: "boolean",
    },
    "playdate.display.getScale": {
      __return: "number",
    },
    "playdate.display.getMosaic": {
      __return: "(number, number)",
    },
    "playdate.display.getOffset": {
      __return: "(number, number)",
    },
    "playdate.file.open": {
      mode: "pd_filemode",
      __return: "pd_file_file",
    },
    "playdate.file.listFiles": {
      showhidden: "boolean",
      __return: "string[]",
    },
    "playdate.file.getSize": {
      __return: "number",
    },
    "playdate.file.getType": {
      __return: "pd_UNDOCUMENTED",
    },
    "playdate.file.modtime": {
      __return: "pd_file_time_table",
    },
    "playdate.file.rename": {
      newPath: "string",
    },
    "playdate.file.load": {
      env: "table",
      __return: "fun()",
    },
    "playdate.file.run": {
      env: "table",
      __return: null,
    },
    "playdate.geometry.squaredDistanceToPoint": {
      __return: "number",
    },
    "playdate.geometry.distanceToPoint": {
      __return: "number",
    },
    "playdate.graphics.setLineCapStyle": {
      style: "pd_line_cap_style",
    },
    "playdate.graphics.drawArc": {
      arc: "pd_arc",
    },
    "playdate.graphics.drawCircleAtPoint": {
      p: "pd_point",
    },
    "playdate.graphics.fillCircleAtPoint": {
      p: "pd_point",
    },
    "playdate.graphics.drawPolygon": {
      p: "pd_polygon",
    },
    "playdate.graphics.fillPolygon": {
      p: "pd_polygon",
    },
    "playdate.graphics.setPolygonFillRule": {
      rule: "pd_polygon_fill_rule",
    },
    "playdate.graphics.perlin": {
      z: "number",
      repeat: "number",
      octaves: "number",
      persistence: "number",
      __return: "number",
    },
    "playdate.graphics.perlinArray": {
      z: "number",
      dz: "number",
      repeat: "number",
      octaves: "number",
      persistence: "number",
      __return: "number[]",
    },
    "playdate.graphics.generateQRCode": {
      stringToEncode: "string",
      desiredEdgeDimension: "number",
      callback: "fun(image: pd_image)",
      __return: "pd_timer",
    },
    "playdate.graphics.drawSineWave": {
      startAmplitude: "number",
      endAmplitude: "number",
      period: "number",
      phaseShift: "number",
    },
    "playdate.graphics.setStencilImage": {
      tile: "boolean",
    },
    "playdate.graphics.setStencilPattern": {
      level: "number",
    },
    "playdate.graphics.setStrokeLocation": {
      location: "pd_stroke_location",
    },
    "playdate.graphics.getStrokeLocation": {
      __return: "pd_stroke_location",
    },
    "playdate.graphics.getDrawOffset": {
      __return: "(number, number)",
    },
    "playdate.graphics.getFont": {
      __return: "pd_font",
    },
    "playdate.graphics.getSystemFont": {
      __return: "pd_font",
    },
    "playdate.graphics.drawText": {
      __return: "(number, number)",
    },
    "playdate.graphics.drawLocalizedText": {
      key: "string",
    },
    "playdate.graphics.getLocalizedText": {
      key: "string",
    },
    "playdate.graphics.getTextSize": {
      str: "string",
    },
    "playdate.graphics.drawTextInRect": {
      __return: "(number, number, boolean)",
    },
    "playdate.graphics.imageWithText": {
      __return: "(pd_image, boolean)",
    },
    "playdate.keyboard.setCapitalizationBehavior": {
      behavior: "pd_capitalization",
    },
    "playdate.keyboard.left": {
      __return: "number",
    },
    "playdate.keyboard.width": {
      __return: "number",
    },
    "playdate.math.lerp": {
      t: "number",
    },
    "playdate.simulator.getURL": {
      url: "string",
      __return: "string",
    },
    "playdate.sound.playingSources": {
      __return: "pd_source[]",
    },
    "playdate.timer.keyRepeatTimer": {
      __return: "pd_timer",
      callback: "fun(...)",
    },
    "playdate.timer.keyRepeatTimerWithDelay": {
      delayAfterInitialFiring: "number",
      delayAfterSecondFiring: "number",
      __return: "pd_timer",
      callback: "fun(...)",
    },
    "playdate.timer.allTimers": {
      __return: "pd_timer[]",
    },
    "playdate.frameTimer.allTimers": {
      __return: "pd_frameTimer[]",
    },
    "playdate.menu.item:setTitle": {
      newTitle: "string",
    },
    "playdate.menu.item:getTitle": {
      __return: "string",
    },
    "playdate.file.file:readline": {
      __return: "string",
    },
    "playdate.file.file:read": {
      numberOfBytes: "number",
      __return: "pd_UNDOCUMENTED",
    },
    "playdate.file.file:seek": {
      offset: "number",
    },
    "playdate.file.file:tell": {
      __return: "number",
    },
    "playdate.geometry.affineTransform.new": {
      m11: "number",
      m12: "number",
      m21: "number",
      m22: "number",
      tx: "number",
      ty: "number",
    },
    "playdate.sound.getHeadphoneState": {
      changeCallback: "nil | (fun(boolean, boolean))",
      __return: "(boolean, boolean)",
    },
    "playdate.sound.setOutputsActive": {
      headphones: "boolean",
      speaker: "boolean",
    },
    "playdate.sound.getCurrentTime": {
      __return: "number",
    },
    "playdate.geometry.affineTransform:concat": {
      af: "pd_affineTransform",
    },
    "playdate.geometry.affineTransform:transformedPoint": {
      p: "pd_point",
      __return: "pd_point",
    },
    "playdate.geometry.affineTransform:transformXY": {
      __return: "(number, number)",
    },
    "playdate.geometry.affineTransform:transformLineSegment": {
      ls: "pd_lineSegment",
    },
    "playdate.geometry.affineTransform:transformedLineSegment": {
      ls: "pd_lineSegment",
      __return: "pd_lineSegment",
    },
    "playdate.geometry.affineTransform:transformAABB": {
      r: "pd_rect",
    },
    "playdate.geometry.affineTransform:transformedAABB": {
      r: "pd_rect",
      __return: "pd_rect",
    },
    "playdate.geometry.affineTransform:transformPolygon": {
      p: "pd_polygon",
    },
    "playdate.geometry.affineTransform:transformedPolygon": {
      p: "pd_polygon",
      __return: "pd_polygon",
    },
    "playdate.geometry.arc.new": {
      direction: "boolean",
    },
    "playdate.geometry.arc:pointOnArc": {
      distance: "number",
    },
    "playdate.geometry.lineSegment:unpack": {
      __return: "(number, number, number, number)",
    },
    "playdate.geometry.lineSegment:pointOnLine": {
      distance: "number",
    },
    "playdate.geometry.lineSegment:intersectsLineSegment": {
      ls: "pd_lineSegment",
    },
    "playdate.geometry.lineSegment:intersectsPolygon": {
      poly: "pd_polygon",
      __return: "(boolean, pd_point[])",
    },
    "playdate.geometry.lineSegment:intersectsRect": {
      __return: "(boolean, pd_point[])",
    },
    "playdate.geometry.point:unpack": {
      __return: "(number, number)",
    },
    "playdate.geometry.point:squaredDistanceToPoint": {
      __return: "number",
    },
    "playdate.geometry.point:distanceToPoint": {
      __return: "number",
    },
    "playdate.geometry.polygon.new": {
      p1: "pd_point",
      p2: "pd_point",
      numberOfVertices: "number",
    },
    "playdate.geometry.polygon:copy": {
      __return: "pd_polygon",
    },
    "playdate.geometry.polygon:containsPoint": {
      fillRule: "pd_polygon_fill_rule",
    },
    "playdate.geometry.polygon:getBounds": {
      __return: "(number, number, number, number)",
    },
    "playdate.geometry.polygon:length": {
      __return: "number",
    },
    "playdate.geometry.polygon:setPointAt": {
      n: "number",
    },
    "playdate.geometry.polygon:getPointAt": {
      n: "number",
      __return: "pd_point",
    },
    "playdate.geometry.polygon:intersects": {
      p: "pd_polygon",
    },
    "playdate.geometry.polygon:pointOnPolygon": {
      distance: "number",
    },
    "playdate.geometry.rect.fast_intersection": {
      __return: "(number, number, number, number)",
    },
    "playdate.geometry.rect.fast_union": {
      __return: "(number, number, number, number)",
    },
    "playdate.geometry.rect:unpack": {
      __return: "(number, number, number, number)",
    },
    "playdate.geometry.rect:intersection": {
      __return: "pd_rect",
    },
    "playdate.geometry.rect:union": {
      __return: "pd_rect",
    },
    "playdate.geometry.rect:insetBy": {
      __return: "pd_rect",
    },
    "playdate.geometry.rect:offsetBy": {
      __return: "pd_rect",
    },
    "playdate.geometry.rect:centerPoint": {
      __return: "pd_point",
    },
    "playdate.geometry.size:unpack": {
      __return: "(number, number)",
    },
    "playdate.geometry.vector2D:unpack": {
      __return: "(number, number)",
    },
    "playdate.geometry.vector2D:scale": {
      s: "number",
    },
    "playdate.geometry.vector2D:scaledBy": {
      s: "number",
      __return: "pd_vector2D",
    },
    "playdate.geometry.vector2D:dotProduct": {
      __return: "number",
    },
    "playdate.geometry.vector2D:magnitude": {
      __return: "number",
    },
    "playdate.geometry.vector2D:magnitudeSquared": {
      __return: "number",
    },
    "playdate.geometry.vector2D:angleBetween": {
      __return: "number",
    },
    "playdate.graphics.image:load": {
      __return: "(boolean, string?)",
    },
    "playdate.graphics.image:drawAnchored": {
      ax: "number",
      ay: "number",
    },
    "playdate.graphics.image:drawIgnoringOffset": {
      p: "pd_point",
    },
    "playdate.graphics.image:sample": {
      __return: "pd_color",
    },
    "playdate.graphics.image:drawWithTransform": {
      xform: "pd_affineTransform",
    },
    "playdate.graphics.image:transformedImage": {
      xform: "pd_affineTransform",
    },
    "playdate.graphics.image:drawSampled": {
      centerx: "number",
      centery: "number",
      dxx: "number",
      dyx: "number",
      dxy: "number",
      dyy: "number",
      z: "number",
      tile: "boolean",
    },
    "playdate.graphics.image:setMaskImage": {
      maskImage: "pd_image",
    },
    "playdate.graphics.image:clearMask": {
      opaque: "boolean",
    },
    "playdate.graphics.image:drawBlurred": {
      numPasses: "number",
      xPhase: "number",
      yPhase: "number",
    },
    "playdate.graphics.image:invertedImage": {
      __return: "pd_image",
    },
    "playdate.graphics.image:blendWithImage": {
      __return: "pd_image",
    },
    "playdate.graphics.image:blurredImage": {
      numPasses: "number",
      padEdges: "boolean",
      xPhase: "number",
      yPhase: "number",
      __return: "pd_image",
    },
    "playdate.graphics.image:fadedImage": {
      __return: "pd_image",
    },
    "playdate.graphics.image:vcrPauseFilterImage": {
      __return: "pd_image",
    },
    "playdate.graphics.nineSlice.new": {
      imagePath: "string",
    },
    "playdate.sound.controlsignal:addEvent": {
      step: "number",
      value: "number",
      interpolate: "boolean",
      event: "pd_event",
    },
    "playdate.graphics.animator.new": {
      startTimeOffset: "number",
      lineSegment: "pd_lineSegment",
      arc: "pd_arc",
      polygon: "pd_polygon",
      durations: "number[]",
      parts: "(pd_lineSegment|pd_arc|pd_polygon)[]",
      easingFunctions: "(fun(number, number, number, number): number)",
    },
    "playdate.graphics.animator:currentValue": {
      __return: "number|pd_point",
    },
    "playdate.graphics.animator:valueAtTime": {
      time: "number",
      __return: "number|pd_point",
    },
    "playdate.graphics.animator:progress": {
      __return: "number",
    },
    "playdate.graphics.imagetable.new": {
      cellsWide: "number",
      cellSize: "number",
    },
    "playdate.graphics.imagetable:getImage": {
      n: "integer",
    },
    "playdate.graphics.imagetable:setImage": {
      n: "integer",
    },
    "playdate.graphics.imagetable:load": {
      __return: "(boolean, string?)",
    },
    "playdate.graphics.imagetable:getSize": {
      __return: "(number, number)",
    },
    "playdate.graphics.imagetable:drawImage": {
      n: "integer",
    },
    "playdate.graphics.tilemap:setTiles": {
      data: "integer[]",
    },
    "playdate.graphics.tilemap:getTiles": {
      __return: "(integer[], integer)",
    },
    "playdate.graphics.tilemap:setTileAtPosition": {
      index: "integer",
    },
    "playdate.graphics.tilemap:getTileAtPosition": {
      __return: "integer?",
    },
    "playdate.graphics.tilemap:getPixelSize": {
      __return: "(number, number)",
    },
    "playdate.graphics.tilemap:getCollisionRects": {
      emptyIDs: "integer[]",
    },
    "playdate.graphics.sprite.new": {
      image_or_tilemap: "pd_image|pd_tilemap",
    },
    "playdate.graphics.sprite.spriteWithText": {
      __return: "(pd_sprite, boolean)",
    },
    "playdate.graphics.sprite.setBackgroundDrawingCallback": {
      drawCallback: "fun(number, number, number, number)",
      __return: null,
    },
    "playdate.graphics.sprite.setClipRectsInRange": {
      startz: "number",
      endz: "number",
    },
    "playdate.graphics.sprite.clearClipRectsInRange": {
      startz: "number",
      endz: "number",
    },
    "playdate.graphics.sprite.getAllSprites": {
      __return: "pd_sprite[]",
    },
    "playdate.graphics.sprite.performOnAllSprites": {
      f: "fun(pd_sprite)",
    },
    "playdate.graphics.sprite.allOverlappingSprites": {
      __return: "table<1|2,pd_sprite>[]",
    },
    "playdate.graphics.sprite.querySpritesAtPoint": {
      __return: "pd_sprite[]",
      p: "pd_point",
    },
    "playdate.graphics.sprite.querySpritesInRect": {
      __return: "pd_sprite[]",
    },
    "playdate.graphics.sprite.querySpritesAlongLine": {
      __return: "pd_sprite[]",
      lineSegment: "pd_lineSegment",
    },
    "playdate.graphics.sprite.querySpriteInfoAlongLine": {
      __return: "(pd_line_collision_info[], integer)",
      lineSegment: "pd_lineSegment",
    },
    "playdate.graphics.sprite.addEmptyCollisionSprite": {
      r: "pd_rect",
    },
    "playdate.graphics.sprite.addWallSprites": {
      tilemap: "pd_tilemap",
      emptyIDs: "integer[]",
      xOffset: "number",
      yOffset: "number",
      __return: "pd_sprite[]",
    },
    "playdate.graphics.sprite:getPosition": {
      __return: "(number, number)",
    },
    "playdate.graphics.sprite:setZIndex": {
      z: "number",
    },
    "playdate.graphics.sprite:getZIndex": {
      __return: "number",
    },
    "playdate.graphics.sprite:getCenter": {
      __return: "(number, number)",
    },
    "playdate.graphics.sprite:getScale": {
      __return: "(number, number)",
    },
    "playdate.graphics.sprite:getRotation": {
      __return: "number",
    },
    "playdate.graphics.sprite:copy": {
      __return: "pd_sprite",
    },
    "playdate.graphics.sprite:setTag": {
      tag: "integer",
    },
    "playdate.graphics.sprite:getTag": {
      __return: "integer",
    },
    "playdate.graphics.sprite:setBounds": {
      "upper-left-x": "number",
      "upper-left-y": "number",
    },
    "playdate.graphics.sprite:getBounds": {
      __return: "(number, number, number, number)",
    },
    "playdate.graphics.sprite:setTilemap": {
      tilemap: "pd_tilemap",
    },
    "playdate.graphics.sprite:setAnimator": {
      animator: "pd_animator",
      moveWithCollisions: "boolean",
      removeOnCollision: "boolean",
    },
    "playdate.graphics.sprite:setStencilImage": {
      stencil: "pd_image",
      tile: "boolean",
    },
    "playdate.graphics.sprite:setStencilPattern": {
      level: "number",
    },
    "playdate.graphics.sprite.removeSprites": {
      spriteArray: "pd_sprite[]",
    },
    "playdate.graphics.sprite:getCollideBounds": {
      __return: "(number, number, number, number)",
    },
    "playdate.graphics.sprite:overlappingSprites": {
      __return: "pd_sprite[]",
    },
    "playdate.graphics.sprite:setGroups": {
      groups: "integer[]",
    },
    "playdate.graphics.sprite:setCollidesWithGroups": {
      groups: "integer[]",
    },
    "playdate.graphics.sprite:setGroupMask": {
      mask: "integer",
    },
    "playdate.graphics.sprite:getGroupMask": {
      __return: "integer",
    },
    "playdate.graphics.sprite:setCollidesWithGroupsMask": {
      mask: "integer",
    },
    "playdate.graphics.sprite:getCollidesWithGroupsMask": {
      __return: "integer",
    },
    "playdate.graphics.sprite:moveWithCollisions": {
      __return: "(number, number, pd_sprite_collision_info[], integer)",
      goalPoint: "pd_point",
    },
    "playdate.graphics.sprite:checkCollisions": {
      __return: "(number, number, pd_sprite_collision_info[], integer)",
    },
    "playdate.graphics.sprite:collisionResponse": {
      other: "pd_sprite",
      __return: "pd_collision_type",
    },
    "playdate.graphics.font.newFamily": {
      fontPaths: "pd_font_family_paths",
      __return: "pd_font_family",
    },
    "playdate.graphics.font:drawText": {
      __return: "(number, number)",
    },
    "playdate.graphics.font:getGlyph": {
      __return: "pd_image",
    },
    "playdate.graphics.video:getContext": {
      __return: "pd_image",
    },
    "playdate.graphics.video:renderFrame": {
      number: "integer",
    },
    "playdate.pathfinder.graph.new": {
      coordinates: "table<1|2, number>[]",
    },
    "playdate.pathfinder.graph.new2DGrid": {
      allowDiagonals: "boolean",
      includedNodes: "integer[]",
      __return: "pd_graph",
    },
    "playdate.pathfinder.graph:addNewNode": {
      id: "integer",
      connectedNodes: "pd_node[]",
      weights: "number[]",
      addReciprocalConnections: "boolean",
    },
    "playdate.pathfinder.graph:addNewNodes": {
      __return: "pd_node[]",
    },
    "playdate.pathfinder.graph:addNode": {
      connectedNodes: "pd_node[]",
      weights: "number[]",
      addReciprocalConnections: "boolean",
    },
    "playdate.pathfinder.graph:addNodes": {
      nodes: "pd_node[]",
    },
    "playdate.pathfinder.graph:allNodes": {
      __return: "pd_node[]",
    },
    "playdate.pathfinder.graph:removeNodeWithXY": {
      __return: "pd_node",
    },
    "playdate.pathfinder.graph:removeNodeWithID": {
      id: "integer",
      __return: "pd_node",
    },
    "playdate.pathfinder.graph:nodeWithID": {
      id: "integer",
      __return: "pd_node?",
    },
    "playdate.pathfinder.graph:nodeWithXY": {
      __return: "pd_node?",
    },
    "playdate.pathfinder.graph:addConnections": {
      connections: "number[][]",
    },
    "playdate.pathfinder.graph:addConnectionToNodeWithID": {
      fromNodeID: "integer",
      toNodeID: "integer",
      weight: "number",
    },
    "playdate.pathfinder.graph:removeAllConnectionsFromNodeWithID": {
      id: "integer",
    },
    "playdate.pathfinder.graph:findPath": {
      startNode: "pd_node",
      goalNode: "pd_node",
      heuristicFunction: "nil | (fun(pd_node, pd_node): number)",
      findPathToGoalAdjacentNodes: "boolean",
      __return: "pd_node[]?",
    },
    "playdate.pathfinder.graph:findPathWithIDs": {
      startNodeID: "integer",
      goalNodeID: "integer",
      heuristicFunction: "nil | (fun(pd_node, pd_node): number)",
      findPathToGoalAdjacentNodes: "boolean",
      __return: "integer[]?",
    },
    "playdate.pathfinder.graph:setXYForNodeWithID": {
      id: "integer",
    },
    "playdate.pathfinder.node:addConnection": {
      weight: "number",
      addReciprocalConnection: "boolean",
    },
    "playdate.pathfinder.node:addConnections": {
      nodes: "pd_node[]",
      weights: "number[]",
      addReciprocalConnections: "boolean",
    },
    "playdate.pathfinder.node:addConnectionToNodeWithXY": {
      weight: "number",
      addReciprocalConnection: "boolean",
    },
    "playdate.pathfinder.node:connectedNodes": {
      __return: "pd_node[]",
    },
    "playdate.pathfinder.node.id": {
      __value: "integer",
    },
    "playdate.sound.sampleplayer.new": {
      sample: "pd_sample",
    },
    "playdate.sound.sampleplayer:playAt": {
      when: "number",
      vol: "number",
      rightvol: "number",
    },
    "playdate.sound.sampleplayer:setLoopCallback": {
      callback: "fun(pd_sample, any)",
      arg: "any",
    },
    "playdate.sound.sampleplayer:setPlayRange": {
      start: "number",
      end: "number",
    },
    "playdate.sound.sampleplayer:setFinishCallback": {
      func: "fun(pd_sample, any)",
      arg: "any",
    },
    "playdate.sound.sampleplayer:setSample": {
      sample: "pd_sample",
    },
    "playdate.sound.sampleplayer:getSample": {
      __return: "pd_sample",
    },
    "playdate.sound.sampleplayer:getOffset": {
      __return: "number",
    },
    "playdate.sound.fileplayer.new": {
      buffersize: "number",
    },
    "playdate.sound.fileplayer:setFinishCallback": {
      func: "fun(pd_fileplayer, any)",
      arg: "any",
    },
    "playdate.sound.fileplayer:setLoopRange": {
      loopCallback: "fun(pd_fileplayer, any)",
      start: "number",
      end: "number",
      arg: "any",
    },
    "playdate.sound.fileplayer:setLoopCallback": {
      callback: "fun(pd_fileplayer, any)",
      arg: "any",
    },
    "playdate.sound.fileplayer:setVolume": {
      fadeSeconds: "number",
      fadeCallback: "fun(pd_fileplayer, any)",
      arg: "any",
    },
    "playdate.sound.fileplayer:getOffset": {
      __return: "number",
    },
    "playdate.sound.sample:getSubsample": {
      startOffset: "number",
      endOffset: "number",
    },
    "playdate.sound.sample:load": {
      __return: "pd_UNDOCUMENTED?",
    },
    "playdate.sound.sample:getFormat": {
      __return: "pd_sound_format",
    },
    "playdate.sound.sample:getLength": {
      __return: "(number, number)",
    },
    "playdate.sound.sample:playAt": {
      when: "number",
      vol: "number",
      rightvol: "number",
    },
    "playdate.sound.channel:addSource": {
      source: "pd_source",
    },
    "playdate.sound.channel:removeSource": {
      source: "pd_source",
    },
    "playdate.sound.channel:setVolume": {
      volume: "number",
    },
    "playdate.sound.channel:setPan": {
      pan: "number",
    },
    "playdate.sound.synth.new": {
      waveform: "pd_waveform",
      sample: "pd_sample",
      sustainStart: "number?",
      sustainEnd: "number?",
    },
    "playdate.sound.synth:copy": {
      __return: "pd_synth",
    },
    "playdate.sound.synth:playMIDINote": {
      note: "string|number",
    },
    "playdate.sound.synth:setSustain": {
      level: "number",
    },
    "playdate.sound.synth:getEnvelope": {
      __return: "pd_envelope",
    },
    "playdate.sound.synth:setFinishCallback": {
      function: "fun()",
    },
    "playdate.sound.synth:setParameter": {
      parameter: "integer",
      value: "number",
    },
    "playdate.sound.synth:setParameterMod": {
      parameter: "number",
    },
    "playdate.sound.synth:setWaveform": {
      waveform: "pd_waveform|pd_sample",
    },
    "playdate.sound.signal:setOffset": {
      offset: "number",
    },
    "playdate.sound.lfo.new": {
      type: "pd_lfo_type",
    },
    "playdate.sound.lfo:setType": {
      type: "pd_lfo_type",
    },
    "playdate.sound.lfo:setArpeggio": {
      note1: "number",
    },
    "playdate.sound.lfo:setCenter": {
      center: "number",
    },
    "playdate.sound.lfo:setDepth": {
      depth: "number",
    },
    "playdate.sound.lfo:setPhase": {
      phase: "number",
    },
    "playdate.sound.lfo:setDelay": {
      holdoff: "number",
      ramp: "number",
    },
    "playdate.sound.envelope.new": {
      attack: "number",
      decay: "number",
      sustain: "number",
      release: "number",
    },
    "playdate.sound.envelope:setAttack": {
      attack: "number",
    },
    "playdate.sound.envelope:setDecay": {
      decay: "number",
    },
    "playdate.sound.envelope:setSustain": {
      sustain: "number",
    },
    "playdate.sound.envelope:setRelease": {
      release: "number",
    },
    "playdate.sound.envelope:setCurvature": {
      amount: "number",
    },
    "playdate.sound.envelope:setVelocitySensitivity": {
      amount: "number",
    },
    "playdate.sound.envelope:setRateScaling": {
      scaling: "number",
      start: "number|string",
      end: "number|string",
    },
    "playdate.sound.envelope:setOffset": {
      offset: "number",
    },
    "playdate.sound.envelope:trigger": {
      velocity: "number",
    },
    "playdate.sound.bitcrusher:setMix": {
      level: "number",
    },
    "playdate.sound.bitcrusher:setAmount": {
      amt: "number",
    },
    "playdate.sound.bitcrusher:setUndersampling": {
      amt: "number",
    },
    "playdate.sound.ringmod:setMix": {
      level: "number",
    },
    "playdate.sound.ringmod:setFrequency": {
      f: "number",
    },
    "playdate.sound.onepolefilter:setMix": {
      level: "number",
    },
    "playdate.sound.onepolefilter:setParameter": {
      p: "number",
    },
    "playdate.sound.onepolefilter:setParameterMod": {
      m: "pd_signal",
    },
    "playdate.sound.twopolefilter.new": {
      type: "pd_sound_filter",
    },
    "playdate.sound.twopolefilter:setMix": {
      level: "number",
    },
    "playdate.sound.twopolefilter:setFrequency": {
      f: "number",
    },
    "playdate.sound.twopolefilter:setResonance": {
      r: "number",
    },
    "playdate.sound.twopolefilter:setGain": {
      g: "number",
    },
    "playdate.sound.twopolefilter:setType": {
      type: "pd_sound_filter",
    },
    "playdate.sound.overdrive:setMix": {
      level: "number",
    },
    "playdate.sound.overdrive:setGain": {
      level: "number",
    },
    "playdate.sound.overdrive:setLimit": {
      level: "number",
    },
    "playdate.sound.overdrive:setOffset": {
      level: "number",
    },
    "playdate.sound.delayline:setMix": {
      level: "number",
    },
    "playdate.sound.delayline:setFeedback": {
      level: "number",
    },
    "playdate.sound.delaylinetap:setDelay": {
      time: "number",
    },
    "playdate.sound.delaylinetap:setVolume": {
      level: "number",
    },
    "playdate.sound.sequence.new": {
      "path.mid": "string",
    },
    "playdate.sound.sequence:goToStep": {
      step: "integer",
      play: "boolean",
    },
    "playdate.sound.sequence:getCurrentStep": {
      __return: "integer",
    },
    "playdate.sound.sequence:setTempo": {
      stepsPerSecond: "number",
    },
    "playdate.sound.sequence:getTempo": {
      __return: "number",
    },
    "playdate.sound.sequence:setLoops": {
      startStep: "integer",
      endStep: "integer",
    },
    "playdate.sound.sample.new": {
      format: "pd_sound_format",
    },
    "playdate.sound.sequence:addTrack": {
      __return: "pd_track?",
    },
    "playdate.sound.sequence:setTrackAtIndex": {
      n: "integer",
    },
    "playdate.sound.sequence:getTrackAtIndex": {
      n: "integer",
      __return: "pd_track",
    },
    "playdate.sound.track:addNote": {
      step: "integer",
      note: "string|number",
      velocity: "number",
      __return: null,
      table: "pd_note_table",
    },
    "playdate.sound.track:setNotes": {
      list: "pd_note_table[]",
      __return: null,
    },
    "playdate.sound.track:getNotes": {
      step: "integer",
      endstep: "integer",
      __return: "pd_note_table[]",
    },
    "playdate.sound.track:removeNote": {
      step: "integer",
      note: "string|number",
    },
    "playdate.sound.track:getNotesActive": {
      __return: "integer",
    },
    "playdate.sound.track:getPolyphony": {
      __return: "integer",
    },
    "playdate.sound.track:setInstrument": {
      inst: "pd_instrument",
    },
    "playdate.sound.track:getInstrument": {
      __return: "pd_instrument",
    },
    "playdate.sound.track:addControlSignal": {
      s: "pd_controlsignal",
    },
    "playdate.sound.track:getControlSignals": {
      __return: "pd_controlsignal[]",
    },
    "playdate.sound.instrument.new": {
      synth: "pd_synth",
    },
    "playdate.sound.instrument:addVoice": {
      v: "pd_synth",
      note: "string|number",
      rangeend: "string|number",
      transpose: "number",
    },
    "playdate.sound.instrument:setTranspose": {
      halfsteps: "number",
    },
    "playdate.sound.instrument:playNote": {
      frequency: "number",
      vel: "number",
      when: "number",
    },
    "playdate.sound.instrument:playMIDINote": {
      note: "string|number",
      vel: "number",
      when: "number",
    },
    "playdate.sound.instrument:noteOff": {
      note: "string|number",
      when: "number",
    },
    "playdate.sound.controlsignal:setControllerType": {
      number: "number",
    },
    "playdate.sound.controlsignal:getControllerType": {
      __return: "number",
    },
    "playdate.sound.micinput.recordToSample": {
      buffer: "pd_sample",
      completionCallback: "fun(pd_sample)",
    },
    "playdate.sound.micinput.getLevel": {
      __return: "number",
    },
    "playdate.sound.micinput.getSource": {
      __return: "string",
    },
    "playdate.ui.gridview:drawCell": {
      section: "integer",
      selected: "boolean",
    },
    "playdate.ui.gridview:drawSectionHeader": {
      section: "integer",
    },
    "playdate.ui.gridview:setNumberOfSections": {
      num: "integer",
    },
    "playdate.ui.gridview:setNumberOfRowsInSection": {
      section: "integer",
      num: "integer",
    },
    "playdate.ui.gridview:getNumberOfRowsInSection": {
      section: "integer",
    },
    "playdate.ui.gridview:setNumberOfColumns": {
      num: "integer",
    },
    "playdate.ui.gridview:setNumberOfRows": {
      count1: "integer",
    },
    "playdate.ui.gridview:getCellBounds": {
      section: "integer",
      __return: "(number, number, number, number)",
    },
    "playdate.ui.gridview:addHorizontalDividerAbove": {
      section: "integer",
    },
    "playdate.ui.gridview:getScrollPosition": {
      __return: "(number, number)",
    },
    "playdate.ui.gridview:scrollToCell": {
      section: "integer",
      animated: "boolean",
    },
    "playdate.ui.gridview:scrollCellToCenter": {
      section: "integer",
      animated: "boolean",
    },
    "playdate.ui.gridview:scrollToRow": {
      animated: "boolean",
    },
    "playdate.ui.gridview:scrollToTop": {
      animated: "boolean",
    },
    "playdate.ui.gridview:setSelection": {
      section: "integer",
    },
    "playdate.ui.gridview:getSelection": {
      __return: "(integer, integer, integer)",
    },
    "playdate.ui.gridview:getSelectedRow": {
      __return: "integer",
    },
    "playdate.ui.gridview:selectNextColumn": {
      wrapSelection: "boolean",
    },
    "playdate.ui.gridview:selectPreviousColumn": {
      wrapSelection: "boolean",
    },
    "playdate.graphics.animation.loop.new": {
      shouldLoop: "boolean",
    },
    "playdate.graphics.animation.loop:image": {
      __return: "pd_image",
    },
    "playdate.graphics.animation.blinker.new": {
      onDuration: "number",
      offDuration: "number",
      loop: "boolean",
      cycles: "integer",
    },
    "playdate.graphics.animation.blinker:start": {
      onDuration: "number",
      offDuration: "number",
      loop: "boolean",
      cycles: "integer",
      default: "boolean",
    },
    "playdate.graphics.animation.blinker:stop": {
      __return: null,
    },
    "json.encode": {
      table: "table",
    },
    "json.encodePretty": {
      table: "table",
    },
    "json.encodeToFile": {
      table: "table",
    },
    "playdate.menu:addMenuItem": {
      callback: "fun()",
    },
    "playdate.datastore.write": {
      table: "table",
    },
    "playdate.timer.new": {
      callback: "fun(...)",
    },
    "playdate.timer.performAfterDelay": {
      callback: "fun(...)",
    },
    "playdate.frameTimer.new": {
      callback: "fun(...)",
    },
    "playdate.frameTimer.performAfterDelay": {
      callback: "fun(...)",
    },
    "playdate.menu.item:setCallback": {
      callback: "fun()",
    },
    "playdate.graphics.tilemap:setImageTable": {
      table: "pd_imagetable",
    },
    "playdate.sound.sequence:play": {
      finishCallback: "fun(pd_sequence)",
    },
    "playdate.geometry.arc.clockwise": {
      __value: "boolean",
    },
    "playdate.geometry.rect.origin": {
      __value: "READONLY_pd_point",
    },
    "playdate.geometry.rect.size": {
      __value: "READONLY_pd_size",
    },
    "playdate.geometry.rect.top": {
      __value: "READONLY_number",
    },
    "playdate.geometry.rect.bottom": {
      __value: "READONLY_number",
    },
    "playdate.geometry.rect.right": {
      __value: "READONLY_number",
    },
    "playdate.geometry.rect.left": {
      __value: "READONLY_number",
    },
  };

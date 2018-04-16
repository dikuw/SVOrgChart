import styles from "./SvOrgChartWebPart.module.scss";

export default class MyDefaultTemplate {
	public static templateHtml: string =  `
	<div class="${ styles.svOrgChart }">
		<!-- start overlay called when loading -->
		<div id="overlay" class="${ styles.overlay }">
			<i class="fa fa-spinner fa-spin spin-big"></i>
		</div>
		<!-- end overlay called when loading -->

		<!-- start main content -->
		<div class="${ styles.wrapper }">
			<div class="${ styles.tools }">
				<ul id="tool-list">
					<li>
						<a id="newPerson" title="Click here to add a new person"><i class="fa fa-address-card-o"></i></a>
					</li>
					<li>
						<a id="newPhoto" title="Click here to upload photos"><i class="fa fa-picture-o"></i></a>
					</li>
					<li>
						<a id="notifications" title="Click here to configure notifications"><i class="fa fa-exclamation-triangle"></i></a>
					</li>
					<li>
						<a id="help" title="Click to open the SV Org Chart user guide"><i class="fa fa-question-circle-o"></i></a>
					</li>
					<li>
						<a id="list" title="Click here to see all people related to this Org Chart"><i class="fa fa-list"></i></a>
					</li>
					<li>
						<a id="settings" title="Click here to configure your Org Chart"><i class="fa fa-cog" ></i></a>
					</li>
				</ul>
			</div>
			<div class="${ styles.header }">
				<div class="title">SV Org Chart</div>
				<div class="${ styles.filters }">
					<select id="filterDepartments"></select>
					<select id="filterPersons"></select>
				</div>
			</div>
			<div id="chart" class="${ styles.chart }">
			<div class="${ styles.jOrgChart }">
				<table border="0" cellspacing="0" cellpadding="0">
					<tbody>
						<tr class="node-cells">
							<td class="node-cell" colspan="4">
								<div class="${ styles.node }">
									<div class="${ styles.card }">
										<div class="${ styles.attributes }">
											<div>Anthony Garcia</div>
											<div>Mayor</div>
											<div>Mayor's Office</div>
										</div>
										<div class="${ styles.photo }">
											<div><img src="https://static.tvtropes.org/pmwiki/pub/images/garcia_anthony_7034.jpg"></div>
										</div>
										<div class="${ styles.cardFooter }">
											<i title="Add new underneath" class="fa fa-plus-circle" data-dept="6" data-id="10"></i>
											<i title="Email: Anthony.Garcia@email.gov" class="fa fa-envelope-o" data-email="Anthony.Garcia@email.gov"></i>
											<i title="Call: 555-555-5555" class="fa fa-phone" data-phone="555-555-5555"></i>
											<i title="Call: 555-555-5555" class="fa fa-mobile" data-mobile="555-555-5555"></i>
											<i title="Expand/Collapse children" class="fa fa-arrows-v" style="display: inline-block;"></i>
											<i title="Open context menu" class="fa fa-ellipsis-h" style="grid-column:span 1 / auto;" data-id="10"></i>
										</div>
									</div>
								</div>
							</td>
						</tr>
						<tr>
							<td colspan="4">
								<div class="${ styles.line } ${ styles.down }"></div>
							</td>
						</tr>
						<tr>
							<td class="${ styles.line } ${ styles.left}">&nbsp;</td>
							<td class="${ styles.line } ${ styles.right}  ${ styles.top}">&nbsp;</td>
							<td class="${ styles.line } ${ styles.left}  ${ styles.top}">&nbsp;</td>
							<td class="${ styles.line } ${ styles.right}">&nbsp;</td>
						</tr>
						<tr>
							<td class="node_container" colspan="2">
								<table border="0" cellspacing="0" cellpadding="0">
									<tbody>
										<tr class="node-cells">
											<td class="node-cell" colspan="2">
												<div class="${ styles.node }">
													<div class="${ styles.card }">
														<div class="${ styles.attributes }">
															<div>Ron Swanson</div>
															<div>Director</div>
															<div>Parks and Recreation</div>
														</div>
														<div class="${ styles.photo }">
															<div><img src="https://memegenerator.net/img/images/600x600/12180039/ron-swanson-headshot.jpg"></div>
														</div>
														<div class="${ styles.cardFooter }">
															<i title="Add new underneath" class="fa fa-plus-circle" data-dept="3" data-id="1"></i>
															<i title="Email: Ron.Swanson@pawnee.org" class="fa fa-envelope-o" data-email="Ron.Swanson@pawnee.org"></i>
															<i title="Call: 555-555-5555" class="fa fa-phone" data-phone="555-555-5555"></i>
															<i title="Call: 555-555-5555" class="fa fa-mobile" data-mobile="555-555-5555"></i>
															<i title="Expand/Collapse children" class="fa fa-arrows-v" style="display: inline-block;"></i>
															<i title="Open context menu" class="fa fa-ellipsis-h" style="grid-column:span 1 / auto;" data-id="1"></i>
														</div>
													</div>
												</div>
											</td>
										</tr>
										<tr>
											<td colspan="2">
												<div class="${ styles.line } ${ styles.down }"></div>
											</td>
										</tr>
										<tr>
											<td class="${ styles.line } ${ styles.left}">&nbsp;</td>
											<td class="${ styles.line } ${ styles.right}">&nbsp;</td>
										</tr>
										<tr>
											<td class="node_container" colspan="2">
												<table border="0" cellspacing="0" cellpadding="0">
													<tbody>
														<tr class="node-cells">
															<td class="node-cell" colspan="6">
																<div class="${ styles.node }">
																	<div class="${ styles.card }">
																		<div class="${ styles.attributes }">
																			<div>Leslie Knope</div>
																			<div>Deputy Director</div>
																			<div>Parks and Recreation</div>
																		</div>
																		<div class="${ styles.photo }">
																			<div><img src="https://www.pride.com/sites/www.pride.com/files/2015/04/01/leslieknope.jpg"></div>
																		</div>
																		<div class="${ styles.cardFooter }">
																			<i title="Add new underneath" class="fa fa-plus-circle" data-dept="3" data-id="2"></i>
																			<i title="Email: Leslie.Knope@pawnee.org" class="fa fa-envelope-o" data-email="Leslie.Knope@pawnee.org"></i>
																			<i title="Call: 555-555-5555" class="fa fa-phone" data-phone="555-555-5555"></i>
																			<i title="Call: 555-555-5555" class="fa fa-mobile" data-mobile="555-555-5555"></i>
																			<i title="Expand/Collapse children" class="fa fa-arrows-v" style="display: inline-block;"></i>
																			<i title="Open context menu" class="fa fa-ellipsis-h" style="grid-column:span 1 / auto;" data-id="2"></i>
																		</div>
																	</div>
																</div>
															</td>
														</tr>
														<tr>
															<td colspan="6">
																<div class="${ styles.line } ${ styles.down }"></div>
															</td>
														</tr>
														<tr>
															<td class="${ styles.line } ${ styles.left}">&nbsp;</td>
															<td class="${ styles.line } ${ styles.right}  ${ styles.top}">&nbsp;</td>
															<td class="${ styles.line } ${ styles.left}  ${ styles.top}">&nbsp;</td>
															<td class="${ styles.line } ${ styles.right}  ${ styles.top}">&nbsp;</td>
															<td class="${ styles.line } ${ styles.left}  ${ styles.top}">&nbsp;</td>
															<td class="${ styles.line } ${ styles.right}">&nbsp;</td>
														</tr>
														<tr>
															<td class="node_container" colspan="2">
																<table border="0" cellspacing="0" cellpadding="0">
																	<tbody>
																		<tr class="node-cells">
																			<td class="node-cell" colspan="2">
																				<div class="${ styles.node }">
																					<div class="${ styles.card }">
																						<div class="${ styles.attributes }">
																							<div>April Ludgate</div>
																							<div>Personal Assistant</div>
																							<div>Parks and Recreation</div>
																						</div>
																						<div class="${ styles.photo }">
																							<div>
																								<img src="https://vignette.wikia.nocookie.net/powerlisting/images/c/cb/April-ludgate_pictureboxart_160w.jpg">
																							</div>
																						</div>
																						<div class="${ styles.cardFooter }">
																							<i title="Add new underneath" class="fa fa-plus-circle" data-dept="3" data-id="3"></i>
																							<i title="Email: April.Ludgate@pawnee.org" class="fa fa-envelope-o" data-email="April.Ludgate@pawnee.org"></i>
																							<i title="Call: 555-555-5555" class="fa fa-phone" data-phone="555-555-5555"></i>
																							<i title="Call: 555-555-5555" class="fa fa-mobile" data-mobile="555-555-5555"></i>
																							<i title="Expand/Collapse children" class="fa fa-arrows-v" style="display: inline-block;"></i>
																							<i title="Open context menu" class="fa fa-ellipsis-h" style="grid-column:span 1 / auto;" data-id="3"></i>
																						</div>
																					</div>
																				</div>
																			</td>
																		</tr>
																	</tbody>
																</table>
															</td>
															<td class="node_container" colspan="2">
																<table border="0" cellspacing="0" cellpadding="0">
																	<tbody>
																		<tr class="node-cells">
																			<td class="node-cell" colspan="2">
																				<div class="${ styles.node }">
																					<div class="${ styles.card }">
																						<div class="${ styles.attributes }">
																							<div>Tom Haverford</div>
																							<div>Administrator</div>
																							<div>Parks and Recreation</div>
																						</div>
																						<div class="${ styles.photo }">
																							<div>
																								<img src="https://1.bp.blogspot.com/-2LLIy8KbkyY/WAmD7EQTRqI/AAAAAAAADSk/
																								YSlkugQK6iIyCyTO1I1HG91oXk7KfRtMACLcB/s200/Tom%2Bheadshot.png">
																							</div>
																						</div>
																						<div class="${ styles.cardFooter }">
																							<i title="Add new underneath" class="fa fa-plus-circle" data-dept="3" data-id="4"></i>
																							<i title="Email: Tom.Haverford@pawnee.org" class="fa fa-envelope-o" data-email="Tom.Haverford@pawnee.org"></i>
																							<i title="Call: 555-555-5555" class="fa fa-phone" data-phone="555-555-5555"></i>
																							<i title="Call: 555-555-5555" class="fa fa-mobile" data-mobile="555-555-5555"></i>
																							<i title="Expand/Collapse children" class="fa fa-arrows-v" style="display: none;"></i>
																							<i title="Open context menu" class="fa fa-ellipsis-h" style="grid-column:span 2 / auto;" data-id="4"></i>
																						</div>
																					</div>
																				</div>
																			</td>
																		</tr>
																	</tbody>
																</table>
															</td>
															<td class="node_container" colspan="2">
																<table border="0" cellspacing="0" cellpadding="0">
																	<tbody>
																		<tr class="node-cells">
																			<td class="node-cell" colspan="2">
																				<div class="${ styles.node }">
																					<div class="${ styles.card }">
																						<div class="${ styles.attributes }">
																							<div>Donna Meagle</div>
																							<div>Office Manager</div>
																							<div>Parks and Recreation</div>
																						</div>
																						<div class="${ styles.photo }">
																							<div>
																								<img src="https://speakerdata2.s3.amazonaws.com/photo/image/876180/retta_donnaMeagle.jpg">
																							</div>
																						</div>
																						<div class="${ styles.cardFooter }">
																							<i title="Add new underneath" class="fa fa-plus-circle" data-dept="3" data-id="5"></i>
																							<i title="Email: Donna.Meagle@pawnee.org" class="fa fa-envelope-o" data-email="Donna.Meagle@pawnee.org"></i>
																							<i title="Call: 555-555-5555" class="fa fa-phone" data-phone="555-555-5555"></i>
																							<i title="Call: 555-555-5555" class="fa fa-mobile" data-mobile="555-555-5555"></i>
																							<i title="Expand/Collapse children" class="fa fa-arrows-v" style="display: inline-block;"></i>
																							<i title="Open context menu" class="fa fa-ellipsis-h" style="grid-column:span 1 / auto;" data-id="5"></i>
																						</div>
																					</div>
																				</div>
																			</td>
																		</tr>
																		<tr>
																			<td colspan="2">
																				<div class="${ styles.line } ${ styles.down }"></div>
																			</td>
																		</tr>
																		<tr>
																			<td class="${ styles.line } ${ styles.left}">&nbsp;</td>
																			<td class="${ styles.line } ${ styles.right}">&nbsp;</td>
																		</tr>
																		<tr>
																			<td class="node_container" colspan="2">
																				<table border="0" cellspacing="0" cellpadding="0">
																					<tbody>
																						<tr class="node-cells">
																							<td class="node-cell" colspan="2">
																								<div class="${ styles.node }">
																									<div class="${ styles.card }">
																										<div class="${ styles.attributes }">
																											<div>Jerry Gergich</div>
																											<div>Employee</div>
																											<div>Parks and Recreation</div>
																										</div>
																										<div class="${ styles.photo }">
																											<div>
																												<img src="https://vignette.wikia.nocookie.net/parksandrecreation/images/3/38/Jerry.jpg">
																											</div>
																										</div>
																										<div class="${ styles.cardFooter }">
																											<i title="Add new underneath" class="fa fa-plus-circle" data-dept="3" data-id="6"></i>
																											<i title="Email: Jerry.Gergich@pawnee.org" class="fa fa-envelope-o" data-email="Jerry.Gergich@pawnee.org"></i>
																											<i title="Call: 555-555-5555" class="fa fa-phone" data-phone="555-555-5555"></i>
																											<i title="Call: 555-555-5555" class="fa fa-mobile" data-mobile="555-555-5555"></i>
																											<i title="Expand/Collapse children" class="fa fa-arrows-v" style="display: inline-block;"></i>
																											<i title="Open context menu" class="fa fa-ellipsis-h" style="grid-column:span 1 / auto;" data-id="6"></i>
																										</div>
																									</div>
																								</div>
																							</td>
																						</tr>
																						<tr>
																							<td colspan="2">
																								<div class="${ styles.line } ${ styles.down }"></div>
																							</td>
																						</tr>
																						<tr>
																							<td class="${ styles.line } ${ styles.left}">&nbsp;</td>
																							<td class="${ styles.line } ${ styles.right}">&nbsp;</td>
																						</tr>
																						<tr>
																							<td class="node_container" colspan="2">
																								<table border="0" cellspacing="0" cellpadding="0">
																									<tbody>
																										<tr class="node-cells">
																											<td class="node-cell" colspan="2">
																												<div class="${ styles.node }">
																													<div class="${ styles.card }">
																														<div class="${ styles.attributes }">
																															<div>BJ Novak</div>
																															<div>Intern</div>
																															<div>Parks and Recreation</div>
																														</div>
																														<div class="${ styles.photo }">
																															<div>
																																<img src="https://upload.wikimedia.org/wikipedia/en/3/35/Ryan_season_6_style.jpg">
																															</div>
																														</div>
																														<div class="${ styles.cardFooter }">
																															<i title="Add new underneath" class="fa fa-plus-circle" data-dept="3" data-id="7"></i>
																															<i title="Email: BJ.Novak@pawnee.org" class="fa fa-envelope-o" data-email="BJ.Novak@pawnee.org"></i>
																															<i title="Call: 555-555-5555" class="fa fa-phone" data-phone="555-555-5555"></i>
																															<i title="Call: 555-555-5555" class="fa fa-mobile" data-mobile="555-555-5555"></i>
																															<i title="Expand/Collapse children" class="fa fa-arrows-v" style="display: inline-block;"></i>
																															<i title="Open context menu" class="fa fa-ellipsis-h" style="grid-column:span 1 / auto;" data-id="7"></i>
																														</div>
																													</div>
																												</div>
																											</td>
																										</tr>
																										<tr>
																											<td colspan="2">
																												<div class="${ styles.line } ${ styles.down }"></div>
																											</td>
																										</tr>
																										<tr>
																											<td class="${ styles.line } ${ styles.left}">&nbsp;</td>
																											<td class="${ styles.line } ${ styles.right}">&nbsp;</td>
																										</tr>
																										<tr>
																											<td class="node_container" colspan="2">
																												<table border="0" cellspacing="0" cellpadding="0">
																													<tbody>
																														<tr class="node-cells">
																															<td class="node-cell" colspan="2">
																																<div class="${ styles.node }">
																																	<div class="${ styles.card }">
																																		<div class="${ styles.attributes }">
																																			<div>Muffin</div>
																																			<div>Office Cat</div>
																																			<div>Parks and Recreation</div>
																																		</div>
																																		<div class="${ styles.photo }">
																																			<div>
																																				<img src="https://d3tfjnq35srlo8.cloudfront.net/uploads/2013/05/NE112.25684188-1-x-e1369232349612.jpg">
																																			</div>
																																		</div>
																																		<div class="${ styles.cardFooter }">
																																			<i title="Add new underneath" class="fa fa-plus-circle" data-dept="3" data-id="8"></i>
																																			<i title="Email: Muffin@pawnee.org" class="fa fa-envelope-o" data-email="Muffin@pawnee.org"></i>
																																			<i title="Call: 555-555-5555" class="fa fa-phone" data-phone="555-555-5555"></i>
																																			<i title="Call: 555-555-5555" class="fa fa-mobile" data-mobile="555-555-5555"></i>
																																			<i title="Expand/Collapse children" class="fa fa-arrows-v" style="display: inline-block;"></i>
																																			<i title="Open context menu" class="fa fa-ellipsis-h" style="grid-column:span 1 / auto;" data-id="8"></i>
																																		</div>
																																	</div>
																																</div>
																															</td>
																														</tr>
																														<tr>
																															<td colspan="2">
																																<div class="${ styles.line } ${ styles.down }"></div>
																															</td>
																														</tr>
																														<tr>
																															<td class="${ styles.line } ${ styles.left}">&nbsp;</td>
																															<td class="${ styles.line } ${ styles.right}">&nbsp;</td>
																														</tr>
																														<tr>
																															<td class="node_container" colspan="2">
																																<table border="0" cellspacing="0" cellpadding="0">
																																	<tbody>
																																		<tr class="node-cells">
																																			<td class="node-cell" colspan="2">
																																				<div class="${ styles.node }">
																																					<div class="${ styles.card }">
																																						<div class="${ styles.attributes }">
																																							<div>Tiger</div>
																																							<div>Cat Intern</div>
																																							<div>Parks and Recreation</div>
																																						</div>
																																						<div class="${ styles.photo }">
																																							<div>
																																								<img src="https://d3tfjnq35srlo8.cloudfront.net/uploads/
																																								2013/05/NE112.25684188-1-x-e1369232349612.jpg">
																																							</div>
																																						</div>
																																						<div class="${ styles.cardFooter }">
																																							<i title="Add new underneath" class="fa fa-plus-circle" data-dept="3" data-id="9"></i>
																																							<i title="Email: Tiger@pawnee.org" class="fa fa-envelope-o" data-email="Tiger@pawnee.org"></i>
																																							<i title="Call: 555-555-5555" class="fa fa-phone" data-phone="555-555-5555"></i>
																																							<i title="Call: 555-555-5555" class="fa fa-mobile" data-mobile="555-555-5555"></i>
																																							<i title="Expand/Collapse children" class="fa fa-arrows-v" style="display: none;"></i>
																																							<i title="Open context menu"
																																							class="fa fa-ellipsis-h" style="grid-column:span 2 / auto;" data-id="9"></i>
																																						</div>
																																					</div>
																																				</div>
																																			</td>
																																		</tr>
																																	</tbody>
																																</table>
																															</td>
																														</tr>
																													</tbody>
																												</table>
																											</td>
																										</tr>
																									</tbody>
																								</table>
																							</td>
																						</tr>
																					</tbody>
																				</table>
																			</td>
																		</tr>
																	</tbody>
																</table>
															</td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
									</tbody>
								</table>
							</td>
							<td class="node_container" colspan="2">
								<table border="0" cellspacing="0" cellpadding="0">
									<tbody>
										<tr class="node-cells">
											<td class="node-cell" colspan="2">
												<div class="${ styles.node }">
													<div class="${ styles.card }">
														<div class="${ styles.attributes }">
															<div>Clancy Wiggum</div>
															<div>Police Chief</div>
															<div>Police</div>
														</div>
														<div class="${ styles.photo }">
															<div>
																<img src="https://2.bp.blogspot.com/-3S77I1xNtks/VRLjypJ6_II/AAAAAAAADm0/eSYkNzrwYLo/s1600/Wiggum_Donut_Crop.jpeg">
															</div>
														</div>
														<div class="${ styles.cardFooter }">
															<i title="Add new underneath" class="fa fa-plus-circle" data-dept="1" data-id="11"></i>
															<i title="Email: Clancy.Wiggum@email.gov" class="fa fa-envelope-o" data-email="Clancy.Wiggum@email.gov"></i>
															<i title="Call: 555-555-5555" class="fa fa-phone" data-phone="555-555-5555"></i>
															<i title="Call: 555-555-5555" class="fa fa-mobile" data-mobile="555-555-5555"></i>
															<i title="Expand/Collapse children" class="fa fa-arrows-v" style="display: inline-block;"></i>
															<i title="Open context menu" class="fa fa-ellipsis-h" style="grid-column:span 1 / auto;" data-id="11"></i>
														</div>
													</div>
												</div>
											</td>
										</tr>
										<tr>
											<td colspan="2">
												<div class="${ styles.line } ${ styles.down }"></div>
											</td>
										</tr>
										<tr>
											<td class="${ styles.line } ${ styles.left}">&nbsp;</td>
											<td class="${ styles.line } ${ styles.right}">&nbsp;</td>
										</tr>
										<tr>
											<td class="node_container" colspan="2">
												<table border="0" cellspacing="0" cellpadding="0">
													<tbody>
														<tr class="node-cells">
															<td class="node-cell" colspan="2">
																<div class="${ styles.node }">
																	<div class="${ styles.card }">
																		<div class="${ styles.attributes }">
																			<div>Lou</div>
																			<div>Sergeant</div>
																			<div>Police</div>
																		</div>
																		<div class="${ styles.photo }">
																			<div><img src="https://vignette.wikia.nocookie.net/simpsons/images/1/17/Lou.png/revision/latest?cb=20130816173729"></div>
																		</div>
																		<div class="${ styles.cardFooter }">
																			<i title="Add new underneath" class="fa fa-plus-circle" data-dept="1" data-id="12"></i>
																			<i title="Email: Lou@email.gov" class="fa fa-envelope-o" data-email="Lou@email.gov"></i>
																			<i title="Call: 555-555-5555" class="fa fa-phone" data-phone="555-555-5555"></i>
																			<i title="Call: 555-555-5555" class="fa fa-mobile" data-mobile="555-555-5555"></i>
																			<i title="Expand/Collapse children" class="fa fa-arrows-v" style="display: inline-block;"></i>
																			<i title="Open context menu" class="fa fa-ellipsis-h" style="grid-column:span 1 / auto;" data-id="12"></i>
																		</div>
																	</div>
																</div>
															</td>
														</tr>
														<tr>
															<td colspan="2">
																<div class="${ styles.line } ${ styles.down }"></div>
															</td>
														</tr>
														<tr>
															<td class="${ styles.line } ${ styles.left}">&nbsp;</td>
															<td class="${ styles.line } ${ styles.right}">&nbsp;</td>
														</tr>
														<tr>
															<td class="node_container" colspan="2">
																<table border="0" cellspacing="0" cellpadding="0">
																	<tbody>
																		<tr class="node-cells">
																			<td class="node-cell" colspan="2">
																				<div class="${ styles.node }">
																					<div class="${ styles.card }">
																						<div class="${ styles.attributes }">
																							<div>Eddie</div>
																							<div>Officer </div>
																							<div>Police</div>
																						</div>
																						<div class="${ styles.photo }">
																							<div>
																								<img src="https://vignette.wikia.nocookie.net/simpsons/images/c/c3/Eddie.png">
																							</div>
																						</div>
																						<div class="${ styles.cardFooter }">
																							<i title="Add new underneath" class="fa fa-plus-circle" data-dept="1" data-id="13"></i>
																							<i title="Email: eddie@email.gov" class="fa fa-envelope-o" data-email="eddie@email.gov"></i>
																							<i title="Call: 555-555-5555" class="fa fa-phone" data-phone="555-555-5555"></i>
																							<i title="Call: 555-555-5555" class="fa fa-mobile" data-mobile="555-555-5555"></i>
																							<i title="Expand/Collapse children" class="fa fa-arrows-v" style="display: none;"></i>
																							<i title="Open context menu" class="fa fa-ellipsis-h" style="grid-column:span 2 / auto;" data-id="13"></i>
																						</div>
																					</div>
																				</div>
																			</td>
																		</tr>
																	</tbody>
																</table>
															</td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			</div>
		</div>
		<!-- end main content -->

		<!-- start ul for output of genList -->
		<ul id="org" style="display:none"></ul>
		<!-- end cul for output of genList  -->

		<!-- start context menu for cards -->
		<div id="contextMenu" class="context" hidden>
		<div class="context_item">
			<div class="inner_item">Edit</div>
		</div>
		<div class="context_item">
			<div class="inner_item">Delete</div>
		</div>
		</div>
		<!-- end context menu for cards -->

		<!-- start pop-up dialogs -->
		<div id="Dialog--Person" class="${ styles.personPopUpDialog }" style="display:none;">
		<form>
			<fieldset>
				<input placeholder="Enter Name..." id="personName" autocomplete="off">
				<input placeholder="Enter Title..." id="personTitle" autocomplete="off">
				<select id="personDepartment" class="${ styles.personDepartment }"></select>
				<input placeholder="Enter Office Phone..." id="personPhone" autocomplete="off">
				<input placeholder="Enter Mobile Phone..." id="personMobile" autocomplete="off">
				<input placeholder="Enter Email..." id="personEmail" autocomplete="off">
				<select id="personSup" class="${ styles.personSup }"></select>
				<div id="personPic"><a href="//dikuw.sharepoint.com/sites/develop_apps/SVAssets/NoImage.png"
					class="${ styles.thumbnail }"><img src="//dikuw.sharepoint.com/sites/develop_apps/SVAssets/NoImage.png" /></a></div>
				<input type="file" value="upload" class="form-control" id="personPhoto" >
			</fieldset>
		</form>
		</div>
		<div id="Dialog--addNewPhoto" style="display:none;"></div>
		<div id="Dialog--alerts" style="display:none;"></div>
		<div id="Dialog--help" style="display:none;"></div>
		<div id="Dialog--settings" style="display:none;"></div>
		<!-- end pop-up dialogs -->
	</div>
    `;
 }
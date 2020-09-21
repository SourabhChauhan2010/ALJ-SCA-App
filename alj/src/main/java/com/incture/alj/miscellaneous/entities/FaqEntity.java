package com.incture.alj.miscellaneous.entities;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "FAQ")
public class FaqEntity {
	
	@Id
	@Column(name = "FAQ_ID")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long faqId;

	@Column(name = "QUESTION")
	private String question;

	@Column(name = "ANSWER")
	private String answer;

	@Column(name = "LAST_UPDATED_ON")
	private Long lastUpdatedOn;

	public Long getFaqId() {
		return faqId;
	}

	public void setFaqId(Long faqId) {
		this.faqId = faqId;
	}

	public String getQuestion() {
		return question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}

	public Long getLastUpdatedOn() {
		return lastUpdatedOn;
	}

	public void setLastUpdatedOn(Long lastUpdatedOn) {
		this.lastUpdatedOn = lastUpdatedOn;
	}

	@Override
	public String toString() {
		return "FaqEntity [faqId=" + faqId + ", question=" + question + ", answer=" + answer + ", lastUpdatedOn="
				+ lastUpdatedOn + "]";
	}
}

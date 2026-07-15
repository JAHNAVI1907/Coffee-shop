package com.example.coffeeshopproject.Service;

import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailServices {

    @Autowired
    private JavaMailSender mailSender;

    // ✅ Simple text email
    public void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("susmilakkilu@gmail.com"); // replace with your Gmail
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }

    // ✅ Email with PDF attachment
    public void sendEmailWithAttachment(String to, String subject, String body, String filename, byte[] attachmentBytes) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom("susmilakkilu@gmail.com"); // must set sender here too
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(body);

            helper.addAttachment(filename, new ByteArrayResource(attachmentBytes));

            mailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException("Error sending email with attachment", e);
        }
    }
}
